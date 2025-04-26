import { ApiProperty } from '@nestjs/swagger'
import { WorkbenchRole } from '@prisma/client'
import { IsArray, IsEnum, IsString } from 'class-validator'

export class Invite {
	@ApiProperty()
	@IsString()
	email: string

	@ApiProperty()
	@IsEnum(WorkbenchRole)
	role: WorkbenchRole
}

export class InviteUsersDto {
	@ApiProperty()
	@IsString()
	workbenchId: string

	@ApiProperty({ type: [Invite] })
	@IsArray()
	emails: Invite[]
}
export class EditMemberDto {
	@ApiProperty()
	@IsEnum(WorkbenchRole)
	role: WorkbenchRole
}
