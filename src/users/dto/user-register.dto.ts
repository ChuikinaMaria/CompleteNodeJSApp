import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Incorrect email' })
	email: string;

	@IsString({ message: 'no password provided' })
	password: string;

	@IsString({ message: 'no name provided' })
	name: string;
}
