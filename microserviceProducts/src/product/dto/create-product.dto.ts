import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  discountPercentage: number;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsInt()
  @IsNotEmpty()
  stock: number;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsInt()
  @IsNotEmpty()
  weight: number;

  @IsString()
  @IsOptional()
  warrantyInformation?: string;

  @IsString()
  @IsOptional()
  shippingInformation?: string;

  @IsString()
  @IsNotEmpty()
  availabilityStatus: string;

  @IsString()
  @IsOptional()
  returnPolicy?: string;

  @IsInt()
  @IsNotEmpty()
  minimumOrderQuantity: number;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  // Relaciones anidadas (opcional, según tu lógica de negocio)
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