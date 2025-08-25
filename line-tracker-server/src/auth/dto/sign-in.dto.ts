import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class SignInDto {
    // @ApiProperty()
    // @IsEmail()
    // public email: string;

    @ApiProperty()
    @Length(5, 32)
    public username: string;

    @ApiProperty()
    @Length(6, 16)
    public password: string;
}