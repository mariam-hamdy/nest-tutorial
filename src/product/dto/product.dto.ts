import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { CategoryDTO } from "src/category/dto/category.dto";

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

   @IsNumber()
   category: number;

    @IsNumber()
    count: number;
    
    @IsBoolean()
    @IsOptional()
    isFeatured: boolean;

    @IsNumber()
    @IsOptional()
    rating: number;
}