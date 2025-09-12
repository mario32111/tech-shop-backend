// microserviceAuth/src/auth/dto/validate-token.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateTokenDto {
  @ApiProperty({
    description: 'El token de acceso a validar',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true
  })
  @IsNotEmpty({ message: 'El token es requerido' })
  @IsString({ message: 'El token debe ser una cadena de texto' })
  token: string;
}
