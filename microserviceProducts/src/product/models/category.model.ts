import {
    Column,
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    Unique,
    DataType,
    HasMany,
} from 'sequelize-typescript';
import { InferCreationAttributes, CreationOptional, InferAttributes } from 'sequelize';
import { Product } from './product.model';

@Table({
    tableName: 'categories',
    timestamps: false,
})
export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
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
    })
    declare name: string;

    @HasMany(() => Product)
    declare products?: Product[];
}