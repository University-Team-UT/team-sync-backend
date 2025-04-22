import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEnum, IsString } from 'class-validator'
import { WorkbenchRole } from 'generated/prisma'

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
