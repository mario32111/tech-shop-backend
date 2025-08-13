// microserviceAuth/src/auth/auth.service.ts

import { Injectable, UnauthorizedException, Inject, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize'; // Para inyectar modelos de Sequelize
import { UserMsg } from 'src/common/constants'; // Asegúrate de que UserMsg esté definido
import { ClientProxyTechShop } from 'src/common/proxy/client-proxy'; // Asegúrate de que esta ruta sea correcta
import * as bcrypt from 'bcrypt'; // Importa bcrypt para hashear y comparar contraseñas
// Importa tus modelos de Sequelize
import { AuthUser } from './models/auth-user.model'; // Renombrado de 'Auth' a 'AuthUser' para claridad
import { RefreshToken } from './models/refresh-token.model'; // Si implementas refresh tokens
import { PasswordResetToken } from './models/password-reset-token.model'; // Si implementas password reset

// DTOs específicos para este microservicio
import { RegisterAuthUserDto } from './dto/register-auth-user.dto'; // DTO para el registro

@Injectable()
export class AuthService {
  private _clientProxyUsers: ClientProxy; // Para comunicarse con microservice-users

  constructor(
    private readonly clientProxy: ClientProxyTechShop, // Asegúrate de que el tipo sea correcto
    private readonly jwtService: JwtService,
    @InjectModel(AuthUser) // Inyecta el modelo AuthUser (antes 'Auth')
    private authUserModel: typeof AuthUser,
    @InjectModel(RefreshToken) // Inyecta el modelo RefreshToken (si lo usas)
    private refreshTokenModel: typeof RefreshToken,
    @InjectModel(PasswordResetToken) // Inyecta el modelo PasswordResetToken (si lo usas)
    private passwordResetTokenModel: typeof PasswordResetToken,
  ) {
    this._clientProxyUsers = this.clientProxy.clientProxyUsers();
  }

  // Método para validar las credenciales de usuario (Login)
  async validateUser(email: string, password: string): Promise<AuthUser | null> {
    // 1. Buscar el usuario en la base de datos de AUTENTICACIÓN
    const authUser = await this.authUserModel.findOne({ where: { email } });

    if (!authUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Comparar la contraseña proporcionada con el hash almacenado
    const isPasswordValid = await bcrypt.compare(password, authUser.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Devolver el usuario de autenticación (sin el hash de la contraseña)
    // Puedes devolver solo un subconjunto de datos si no necesitas todo el modelo
    return authUser;
  }

  // Método para firmar el payload y generar el JWT
  async signIn(authUser: AuthUser): Promise<{ access_token: string }> {
    // El payload del JWT solo debe contener información no sensible
    const payload = {
      email: authUser.email,
      username: authUser.username,
      sub: authUser.id, // 'sub' es el estándar para el ID del sujeto
      // Puedes añadir roles aquí si los gestionas en el modelo AuthUser
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  // Método para registrar un nuevo usuario
  async signUp(registerAuthUserDto: RegisterAuthUserDto): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(registerAuthUserDto.password, 10);

      const authUser = await this.authUserModel.create({
        email: registerAuthUserDto.email,
        username: registerAuthUserDto.username,
        passwordHash: hashedPassword,
        isActive: true,
        isEmailVerified: false,
      } as any);

      const userProfileData = {
        name: registerAuthUserDto.name,
        username: registerAuthUserDto.username,
        email: registerAuthUserDto.email,
        authId: authUser.id,
      };

      const createdUserProfile = await this._clientProxyUsers
        .send(UserMsg.CREATE_USER_PROFILE, userProfileData)
        .toPromise();

      if (!createdUserProfile) {
        await authUser.destroy();
        throw new RpcException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create user profile in Users microservice',
        });
      }

      return this.signIn(authUser);

    } catch (error) {
      // En lugar de `instanceof`, verificamos el nombre del error
      if (error && error.name === 'SequelizeUniqueConstraintError') {
        throw new RpcException({
          status: HttpStatus.CONFLICT, // 409
          message: 'El email ya existe.',
        });
      }

      // Log para depuración si no es un error conocido
      console.error('An unexpected error occurred in AuthService.signUp:', error);

      // Para cualquier otro error, lanzamos una excepción genérica
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      });
    }
  }

  // --- Métodos adicionales para la gestión de tokens y sesiones ---

  async validateAuthToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      // Aquí podrías añadir lógica para verificar si el token está en una blacklist
      // o si el usuario asociado (payload.sub) está activo en la DB de Auth.
      const authUser = await this.authUserModel.findByPk(payload.sub);
      if (!authUser || !authUser.isActive) {
        return { isValid: false, reason: 'User not active or not found' };
      }
      return { isValid: true, payload };
    } catch (error) {
      return { isValid: false, reason: error.message };
    }
  }

  async refreshToken(oldRefreshToken: string): Promise<{ access_token?: string, refreshToken?: string, error?: string }> {
    try {
      // 1. Buscar el refresh token en la DB
      const refreshTokenRecord = await this.refreshTokenModel.findOne({
        where: { token: oldRefreshToken, isRevoked: false },
        include: [AuthUser], // Incluir el usuario asociado
      });

      if (!refreshTokenRecord || refreshTokenRecord.expiresAt < new Date()) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      // 2. Marcar el refresh token antiguo como revocado (para un solo uso)
      refreshTokenRecord.isRevoked = true;
      await refreshTokenRecord.save();

      // 3. Generar un nuevo access token y un nuevo refresh token
      const authUser = refreshTokenRecord.user;
      const newAccessToken = (await this.signIn(authUser)).access_token;
      const newRefreshToken = await this.createRefreshToken(authUser.id);

      return { access_token: newAccessToken, refreshToken: newRefreshToken.token };
    } catch (error) {
      console.error('Error refreshing token:', error);
      return { error: error.message || 'Failed to refresh token' };
    }
  }

  private async createRefreshToken(userId: number): Promise<RefreshToken> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expira en 7 días, ajusta según tu necesidad

    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // Genera un token simple, considera UUIDs

    return this.refreshTokenModel.create({
      userId,
      token,
      expiresAt,
      isRevoked: false,
    });
  }


  async logout(accessToken: string): Promise<{ message: string }> {
    // Lógica para invalidar el access token (si usas una blacklist de JWTs)
    // O simplemente marcar el refresh token como revocado si es un logout completo
    try {
      const payload = this.jwtService.decode(accessToken) as { sub: number };
      if (payload && payload.sub) {
        // Encuentra y revoca todos los refresh tokens asociados a este usuario
        await this.refreshTokenModel.update(
          { isRevoked: true },
          { where: { userId: payload.sub } }
        );
        return { message: 'Logged out successfully' };
      }
      return { message: 'Invalid token payload for logout' };
    } catch (error) {
      console.error('Error during logout:', error);
      return { message: 'Logout failed' };
    }
  }
}
