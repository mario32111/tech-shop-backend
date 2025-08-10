// microserviceAuth/src/auth/dto/refresh-token.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'El token de refresco para obtener un nuevo token de acceso',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true
  })
  @IsNotEmpty({ message: 'El token de refresco es requerido' })
  @IsString({ message: 'El token de refresco debe ser una cadena de texto' })
  refreshToken: string;
}
