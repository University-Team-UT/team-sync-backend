import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateCommentDto {
	@ApiProperty()
	@IsString()
	content: string

	@ApiProperty()
	@IsString()
	authorId: string
}
export class EditCommentDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	content?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	authorId?: string
}
