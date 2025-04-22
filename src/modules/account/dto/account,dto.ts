import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateAccountDto {
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	displayName?: string

	@IsEmail()
	@IsOptional()
	@ApiProperty({ required: false })
	email?: string

	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	about?: string

	@IsDate()
	@IsOptional()
	@ApiProperty({ required: false })
	dateOfBirth?: string

	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	avatar?: string

	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	telegramUsername?: string
}
