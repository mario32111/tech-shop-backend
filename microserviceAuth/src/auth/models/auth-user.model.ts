// microserviceAuth/src/auth/models/auth-user.model.ts

import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  Unique,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany
} from 'sequelize-typescript';
import type { InferCreationAttributes,
  CreationOptional, // Importar CreationOptional
  InferAttributes, } from 'sequelize';
import { RefreshToken } from './refresh-token.model';
import { PasswordResetToken } from './password-reset-token.model';

@Table({
  tableName: 'auth_users', // Table name in the database
  timestamps: true, // Enables createdAt and updatedAt automatically
})
export class AuthUser extends Model<InferAttributes<AuthUser>, InferCreationAttributes<AuthUser>> { // Use InferAttributes and InferCreationAttributes

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: CreationOptional<number>; // Add 'declare' and 'CreationOptional'

  @Unique // Ensures email is unique
  @Column({
    type: DataType.STRING(255), // Defines data type and length
    allowNull: false,
    field: 'email', // Column name in the DB if different from property name
  })
  email: string;

  @Unique // Ensures username is unique
  @Column({
    type: DataType.STRING(100),
    allowNull: true, // Can be null if email is the primary identifier
    field: 'username',
  })
  username: string;

  @Column({
    type: DataType.STRING(255), // Long enough for a password hash (e.g., bcrypt)
    allowNull: false,
    field: 'password_hash', // Column name in the DB
  })
  passwordHash: string; // Stores the password hash

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true, // By default, the account is active
    allowNull: false,
    field: 'is_active',
  })
  isActive: boolean; // To enable/disable the account

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false, // By default, the email is not verified
    allowNull: false,
    field: 'is_email_verified',
  })
  isEmailVerified: boolean; // To verify if the email has been confirmed

  @CreatedAt // Field for creation date (automatic)
  declare createdAt: CreationOptional<Date>; // Add 'declare' and 'CreationOptional'

  @UpdatedAt // Field for last update date (automatic)
  declare updatedAt: CreationOptional<Date>; // Add 'declare' and 'CreationOptional'

  // Relationships (if using RefreshToken and PasswordResetToken)
  @HasMany(() => RefreshToken)
  declare refreshTokens: RefreshToken[]; // Add 'declare' for relations

  @HasMany(() => PasswordResetToken)
  declare passwordResetTokens: PasswordResetToken[]; // Add 'declare' for relations
}
