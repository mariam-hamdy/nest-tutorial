import { IsOptional, IsString } from "class-validator";

export class CategoryDTO {
    
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    color: string;
}