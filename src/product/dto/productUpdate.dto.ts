import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductUpdateDto {
    
    @IsOptional()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsString()
    @IsOptional()
    brand: string;

    @IsString()
    @IsOptional()
    category: string;

    @IsNumber()
    @IsOptional()
    count: number;
    
    @IsBoolean()
    @IsOptional()
    isFeatured: boolean;

    @IsNumber()
    @IsOptional()
    rating: number;
}