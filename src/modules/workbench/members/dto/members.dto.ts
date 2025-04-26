import { ApiProperty } from '@nestjs/swagger'
import { WorkbenchRole } from '@prisma/client'
import { IsArray, IsEnum, IsString } from 'class-validator'

export class InviteUsersDto {
	@ApiProperty()
	@IsString()
	workbenchId: string

	@ApiProperty({ type: [String] })
	@IsArray()
	@IsString({ each: true })
	emails: string[]
}

export class EditMemberDto {
	@ApiProperty()
	@IsEnum(WorkbenchRole)
	role: WorkbenchRole
}
