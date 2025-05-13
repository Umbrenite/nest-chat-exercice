import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
        @IsNotEmpty()
        @IsString()
        firstname: string;
    
        @IsNotEmpty()
        @IsString()
        lastname: string;
    
        @IsNotEmpty()
        @IsString()
        username: string;
    
        @IsNotEmpty()
        @IsString()
        password: string;
    
        @IsNotEmpty()
        @IsString()
        email: string;
    
        @IsNotEmpty()
        @IsString()
        custom_profil_color: string;

        @IsNotEmpty()
        @IsString()
        custom_username_color: string;
    
        @IsNotEmpty()
        @IsArray()
        group_ids: string[];
}
