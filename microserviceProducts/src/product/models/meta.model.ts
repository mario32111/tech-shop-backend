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
import { Product } from './Product';

@Table({
    tableName: 'meta',
    timestamps: false,
})
export class Meta extends Model<InferAttributes<Meta>, InferCreationAttributes<Meta>> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare id: CreationOptional<number>;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'created_at',
    })
    declare createdAt: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'updated_at',
    })
    declare updatedAt: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    declare barcode: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: 'qr_code',
    })
    declare qrCode: string;

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