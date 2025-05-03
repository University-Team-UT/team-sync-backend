import { ApiProperty } from '@nestjs/swagger'
import { Priority, TaskStatus } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateTaskDto {
	@ApiProperty()
	@IsString()
	columnId: string

	@ApiProperty()
	@IsString()
	title: string

	@ApiProperty({ required: false })
	@IsEnum(Priority)
	@IsOptional()
	priority?: Priority

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	executorId?: string
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	workbenchId?: string
}
export class UpdateTaskDto {
	@IsString()
	@ApiProperty({ required: false })
	@IsOptional()
	columnId?: string

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	title?: string

	@ApiProperty({ required: false })
	@IsEnum(Priority)
	@IsOptional()
	priority?: Priority

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	executorId?: string

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	workbenchId?: string

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	deadline?: string

	@IsNumber()
	position: number

	@ApiProperty({ required: false })
	@IsEnum(TaskStatus)
	@IsOptional()
	status?: TaskStatus
}
export class CreateSubtaskDto {
	@ApiProperty()
	@IsString()
	taskId: string

	@ApiProperty()
	@IsString()
	title: string
}
export class UpdateSubtaskDto {
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	taskId?: string

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	title?: string
}
