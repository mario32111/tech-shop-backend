// microservice_users/src/users/models/user-profile.model.ts

import { Column, Model, Table, PrimaryKey, DataType } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({
    tableName: 'user_profiles',
    timestamps: true,
})
export class UserProfile extends Model<InferAttributes<UserProfile>, InferCreationAttributes<UserProfile>> {

    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
    })
    id: number;

    // Se remueve el decorador @ForeignKey y @BelongsTo
    @Column({
        type: DataType.INTEGER,
        unique: true, // Esto asegura que cada perfil está vinculado a un único AuthUser
        field: 'auth_id', // Es buena práctica definir el nombre de la columna
        allowNull: false,
    })
    authId: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: true,
    })
    birthDate: Date;

    @Column({
        type: DataType.STRING(10),
        allowNull: true,
    })
    gender: string;
}