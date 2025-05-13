import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDiscussionDto {
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsNumber()
    @IsNotEmpty()
    group_id: string;

    @IsDate()
    @IsNotEmpty()
    timestamp: string;
}
