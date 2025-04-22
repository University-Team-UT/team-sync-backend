import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateWorkbenchDto {
	@ApiProperty()
	@IsString()
	title: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	description?: string
}
export class UpdateWorkbenchDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	title: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	description: string

	@ApiProperty()
	@IsString()
	workbenchId: string
}
