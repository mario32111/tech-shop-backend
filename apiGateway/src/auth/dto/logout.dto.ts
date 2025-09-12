// microserviceAuth/src/auth/dto/logout.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty({
    description: 'El token de acceso actual del usuario para cerrar sesión',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true
  })
  @IsNotEmpty({ message: 'El token de acceso es requerido para el logout' })
  @IsString({ message: 'El token de acceso debe ser una cadena de texto' })
  accessToken: string;
}
