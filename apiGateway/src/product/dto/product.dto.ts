import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsInt, ValidateNested } from 'class-validator';

class DimensionsDto {
    @ApiProperty()
    @IsNumber()
    width: number;

    @ApiProperty()
    @IsNumber()
    height: number;

    @ApiProperty()
    @IsNumber()
    depth: number;
}

class MetaDto {
    @ApiProperty()
    @IsString()
    barcode: string;

    @ApiProperty()
    @IsString()
    qrCode: string;
}

class ImageDto {
    @ApiProperty()
    @IsString()
    url: string;
}

export class ProductDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    categoryId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    price: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    discountPercentage: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    rating: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    stock: number;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    tags?: string[];

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    brand: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sku: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    weight: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    warrantyInformation?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    shippingInformation?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    availabilityStatus: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    returnPolicy?: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    minimumOrderQuantity: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    thumbnail: string;

    @ApiProperty({ type: () => DimensionsDto })
    @IsOptional()
    @ValidateNested()
    @Type(() => DimensionsDto)
    dimensions?: DimensionsDto;

    @ApiProperty({ type: () => MetaDto })
    @IsOptional()
    @ValidateNested()
    @Type(() => MetaDto)
    meta?: MetaDto;

    @ApiProperty({ type: () => [ImageDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    images?: ImageDto[];
}