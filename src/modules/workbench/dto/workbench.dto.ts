import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateWorkbenchDto {
	@ApiProperty({ required: false })
	@IsString()
	title: string

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	description?: string
}
export class UpdateWorkbenchDto {
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	title: string

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	description: string

	@ApiProperty({ required: false })
	@IsString()
	workbenchId: string
}
