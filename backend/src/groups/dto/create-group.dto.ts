import { IsNotEmpty, IsString } from "class-validator";

export class CreateGroupDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
    
    @IsNotEmpty()
    @IsString()
    icon_url: string;
}
