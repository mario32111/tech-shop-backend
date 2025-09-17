import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsInt, ValidateNested } from 'class-validator';

class DimensionsDto {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    width?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    height?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    depth?: number;
}

class MetaDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    barcode?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    qrCode?: string;
}

class ImageDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    url?: string;
}

export class PatchProductDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description?: string;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    categoryId?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    price?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    discountPercentage?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    rating?: number;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    stock?: number;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    tags?: string[];

    @ApiProperty()
    @IsString()
    @IsOptional()
    brand?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    sku?: string;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    weight?: number;

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
    @IsOptional()
    availabilityStatus?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    returnPolicy?: string;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    minimumOrderQuantity?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    thumbnail?: string;

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
