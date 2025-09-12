// microserviceAuth/src/auth/models/password-reset-token.model.ts

import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { AuthUser } from './auth-user.model'; // Importa el modelo AuthUser
import { CreationOptional } from 'sequelize';

@Table({
  tableName: 'password_reset_tokens',
  timestamps: true,
})
export class PasswordResetToken extends Model<PasswordResetToken> {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @ForeignKey(() => AuthUser) // Clave foránea que referencia al AuthUser
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => AuthUser) // Define la relación "pertenece a"
  user: AuthUser;

  @Column({
    type: DataType.STRING(255), // Suficientemente largo para un token único
    allowNull: false,
    unique: true, // Cada token debe ser único
    field: 'token',
  })
  token: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'expires_at',
  })
  expiresAt: Date; // Fecha de expiración del token

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false, // Por defecto, el token no ha sido usado
    allowNull: false,
    field: 'is_used',
  })
  isUsed: boolean; // Para marcar el token como usado después del restablecimiento

  @CreatedAt
  declare createdAt: CreationOptional<Date>; // Añadir 'declare' y 'CreationOptional'

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>; // Añadir 'declare' y 'CreationOptional'

}
