import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsInt } from 'class-validator';

export class PatchProductDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    @IsOptional()
    categoryId?: number;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsNumber()
    @IsOptional()
    discountPercentage?: number;

    @IsNumber()
    @IsOptional()
    rating?: number;

    @IsInt()
    @IsOptional()
    stock?: number;

    @IsArray()
    @IsOptional()
    tags?: string[];

    @IsString()
    @IsOptional()
    brand?: string;

    @IsString()
    @IsOptional()
    sku?: string;

    @IsInt()
    @IsOptional()
    weight?: number;

    @IsString()
    @IsOptional()
    warrantyInformation?: string;

    @IsString()
    @IsOptional()
    shippingInformation?: string;

    @IsString()
    @IsOptional()
    availabilityStatus?: string;

    @IsString()
    @IsOptional()
    returnPolicy?: string;

    @IsInt()
    @IsOptional()
    minimumOrderQuantity?: number;

    @IsString()
    @IsOptional()
    thumbnail?: string;

    @IsOptional()
    dimensions?: {
        width: number;
        height: number;
        depth: number;
    };

    @IsOptional()
    meta?: {
        barcode: string;
        qrCode: string;
    };

    @IsOptional()
    @IsArray()
    images?: { url: string }[];
}
