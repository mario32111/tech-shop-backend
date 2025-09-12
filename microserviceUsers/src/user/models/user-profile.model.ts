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
} from 'sequelize-typescript';
import { InferCreationAttributes, CreationOptional, InferAttributes } from 'sequelize';

@Table({
  tableName: 'user_profiles',
  timestamps: true,
})
export class UserProfile extends Model<InferAttributes<UserProfile>, InferCreationAttributes<UserProfile>> {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: CreationOptional<number>;

  @Unique
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'email',
  })
  declare email: string;

  @Unique
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'username',
  })
  declare username: string;

  @Column({
    type: DataType.INTEGER,
    unique: true,
    field: 'auth_id',
    allowNull: false,
  })
  declare authId: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  declare birthDate: Date;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  declare gender: string;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
}
