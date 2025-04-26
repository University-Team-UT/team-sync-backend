import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class RegisterDto {
	@IsEmail()
	@ApiProperty()
	email: string

	@MinLength(4, {
		message: 'Пароль должен быть не меньше 8 символов'
	})
	@IsString()
	@ApiProperty()
	password: string
	@IsString()
	@ApiProperty()
	displayName: string
}

export class LoginDto {
	@IsEmail()
	@ApiProperty()
	email: string

	@MinLength(4, {
		message: 'Пароль должен быть не меньше 8 символов'
	})
	@ApiProperty()
	@IsString()
	password: string
}

export class ChangePasswordDto {
	@ApiProperty()
	@IsString()
	oldPassword: string

	@MinLength(4, {
		message: 'Пароль должен быть не меньше 8 символов'
	})
	@ApiProperty()
	@IsString()
	newPassword: string
}
