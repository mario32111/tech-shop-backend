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
    HasOne,
    HasMany,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { InferCreationAttributes, CreationOptional, InferAttributes } from 'sequelize';
import { Dimensions } from './Dimensions';
import { Review } from './Review';
import { Meta } from './Meta';
import { ProductImage } from './ProductImage';
import { Category } from './category.modeltegory'; // ¡Importa el nuevo modelo!

@Table({
    tableName: 'products',
    timestamps: true,
})
export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
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
    declare title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    declare description: string;

    // Columna para la clave foránea
    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'category_id',
    })
    declare categoryId: number;

    // Relación
    @BelongsTo(() => Category)
    declare category: Category;

    // ... el resto de las columnas del modelo Product se mantienen igual
    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare price: number;

    @Column({
        type: DataType.DECIMAL(5, 2),
        allowNull: false,
        field: 'discount_percentage',
    })
    declare discountPercentage: number;

    @Column({
        type: DataType.DECIMAL(5, 2),
        allowNull: false,
    })
    declare rating: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare stock: number;

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: true,
    })
    declare tags: string[];

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    declare brand: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    declare sku: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare weight: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: 'warranty_information',
    })
    declare warrantyInformation: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: 'shipping_information',
    })
    declare shippingInformation: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: 'availability_status',
    })
    declare availabilityStatus: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: 'return_policy',
    })
    declare returnPolicy: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'minimum_order_quantity',
    })
    declare minimumOrderQuantity: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    declare thumbnail: string;

    @CreatedAt
    declare createdAt: CreationOptional<Date>;

    @UpdatedAt
    declare updatedAt: CreationOptional<Date>;

    // Relaciones
    @HasOne(() => Dimensions, { onDelete: 'CASCADE' })
    declare dimensions?: Dimensions;

    @HasOne(() => Meta, { onDelete: 'CASCADE' })
    declare meta?: Meta;

    @HasMany(() => Review, { onDelete: 'CASCADE' })
    declare reviews?: Review[];

    @HasMany(() => ProductImage, { onDelete: 'CASCADE' })
    declare images?: ProductImage[];
}