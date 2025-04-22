import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsString } from 'class-validator'

export class InviteUsersDto {
	@ApiProperty()
	@IsString()
	workbenchId: string

	@ApiProperty({ type: [String] })
	@IsArray()
	@IsString({ each: true })
	emails: string[]
}
