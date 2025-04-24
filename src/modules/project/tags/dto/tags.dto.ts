import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateTagDto {
	@IsString()
	@ApiProperty()
	title: string

	@IsString()
	@ApiProperty()
	@IsOptional()
	color?: string
}

export class UpdateTagDto {
	@IsString()
	@ApiProperty()
	@IsOptional()
	title?: string

	@IsString()
	@ApiProperty()
	@IsOptional()
	color?: string
}
