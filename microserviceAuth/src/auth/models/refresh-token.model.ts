// microserviceAuth/src/auth/models/refresh-token.model.ts

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

import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'; // O 'sequelize-typescript' si te da error con 'sequelize'

import { AuthUser } from './auth-user.model';

@Table({
  tableName: 'refresh_tokens',
  timestamps: true,
})
// ¡CORRECCIÓN CLAVE AQUÍ! Omitir 'user' de InferCreationAttributes
export class RefreshToken extends Model<
  InferAttributes<RefreshToken>,
  InferCreationAttributes<RefreshToken, { omit: 'user' }> // <-- ¡Añade esto!
> {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: CreationOptional<number>;

  @ForeignKey(() => AuthUser)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => AuthUser)
  user: AuthUser; // Esta propiedad es para acceso en runtime, no para creación

  @Column({
    type: DataType.STRING(512),
    allowNull: false,
    unique: true,
    field: 'token',
  })
  token: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'expires_at',
  })
  expiresAt: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    field: 'is_revoked',
  })
  isRevoked: boolean;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
}
