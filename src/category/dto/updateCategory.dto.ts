import { IsOptional, IsString } from "class-validator";


export class UpdateCategoryDTO {

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    color: string
}


    

