import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class RegisterDTO {

    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    phone: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsBoolean()
    @IsOptional()
    isAdmin: boolean;
}