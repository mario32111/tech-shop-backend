import {
    Column,
    Model,
    Table,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    DataType,
    AutoIncrement,
} from 'sequelize-typescript';
import { InferCreationAttributes, CreationOptional, InferAttributes } from 'sequelize';
import { Product } from './product.model';

@Table({
    tableName: 'dimensions',
    timestamps: false,
})
export class Dimensions extends Model<InferAttributes<Dimensions>, InferCreationAttributes<Dimensions>> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare id: CreationOptional<number>;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare width: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare height: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare depth: number;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'product_id',
    })
    declare productId: number;

    @BelongsTo(() => Product)
    declare product: Product;
}