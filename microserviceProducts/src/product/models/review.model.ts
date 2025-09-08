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
    tableName: 'reviews',
    timestamps: false,
})
export class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare id: CreationOptional<number>;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare rating: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    declare comment: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare date: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: 'reviewer_name',
    })
    declare reviewerName: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: 'reviewer_email',
    })
    declare reviewerEmail: string;

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