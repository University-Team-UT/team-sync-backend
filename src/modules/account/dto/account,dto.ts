import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateAccountDto {
	@IsString()
	@IsOptional()
	@ApiProperty()
	displayName?: string

	@IsEmail()
	@IsOptional()
	@ApiProperty()
	email?: string

	@IsString()
	@IsOptional()
	@ApiProperty()
	about?: string

	@IsDate()
	@IsOptional()
	@ApiProperty()
	dateOfBirth?: string

	@IsString()
	@IsOptional()
	@ApiProperty()
	avatar?: string

	@IsString()
	@IsOptional()
	@ApiProperty()
	telegramUsername?: string
}
