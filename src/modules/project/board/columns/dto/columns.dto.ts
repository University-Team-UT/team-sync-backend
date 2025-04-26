import { ApiProperty } from '@nestjs/swagger'
import { Priority, TaskStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsDate,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator'

export class CreateColumnDto {
	@ApiProperty()
	@IsString()
	title: string

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	color?: string
}

export class UpdateColumnDto {
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	title?: string

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	color?: string
}

export class ChangeColumnPositionDto {
	@ApiProperty()
	@IsNumber()
	newPosition: number
}

export class FilterColumnDto {
	@ApiProperty()
	@IsString()
	boardId: string

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	searchTerm?: string

	@ApiProperty({ required: false })
	@IsArray()
	@IsOptional()
	authorsIds?: string[]

	@ApiProperty({ required: false, enum: TaskStatus })
	@IsEnum(TaskStatus)
	@IsOptional()
	status?: TaskStatus

	@ApiProperty({ required: false, enum: Priority, isArray: true })
	@IsArray()
	@IsEnum(Priority, { each: true })
	@IsOptional()
	priorities?: Priority[]

	@ApiProperty({ required: false, type: [String] })
	@IsArray()
	@IsOptional()
	tags?: string[]

	@ApiProperty({ required: false, type: String, format: 'date-time' })
	@IsDate()
	@Type(() => Date)
	@IsOptional()
	deadline?: Date
}
