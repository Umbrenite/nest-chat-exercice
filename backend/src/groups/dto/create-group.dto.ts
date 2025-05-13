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
    user_ids: string[];

    @IsNotEmpty()
    @IsString()
    discussion_id: string;

    @IsNotEmpty()
    @IsString()
    icon_url: string;
}
