import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDto {
    
    
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    brand: string;

    @IsString()
    category: string;

    @IsNumber()
    count: number;
    
    @IsBoolean()
    @IsOptional()
    isFeatured: boolean;

    @IsNumber()
    @IsOptional()
    rating: number;
}