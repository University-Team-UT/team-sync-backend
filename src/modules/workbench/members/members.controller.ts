import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common'
import { Auth } from 'src/shared/decorators/auth.decorator'

import { MEMBERS_ROUTES } from './config/members.routes'
import { EditMemberDto, InviteUsersDto } from './dto/members.dto'
import { MembersService } from './members.service'

@Controller(MEMBERS_ROUTES.INDEX)
export class MembersController {
	constructor(private readonly membersService: MembersService) {}

	@Get('/:inviterId')
	@Auth()
	@HttpCode(200)
	getInviteLink(
		@Param('inviterId') inviterId: string,
		@Query('workbenchId') workbenchId: string
	) {
		return this.membersService.getInviteLink(inviterId, workbenchId)
	}

	@Get('get-members/:workbenchId')
	@Auth()
	@HttpCode(200)
	getWorkbenchMembers(@Param('workbenchId') workbenchId: string) {
		return this.membersService.getWorkbenchMembers(workbenchId)
	}

	@Post(MEMBERS_ROUTES.INVITE_USERS)
	@Auth()
	@HttpCode(200)
	inviteUsers(@Body() dto: InviteUsersDto) {
		return this.membersService.inviteUsers(dto)
	}

	@Patch(MEMBERS_ROUTES.EDIT_MEMBER_ROLE)
	@Auth()
	@HttpCode(200)
	editMemberRole(
		@Body() dto: EditMemberDto,
		@Param('memberId') memberId: string,
		@Query('workbenchId') workbenchId: string
	) {
		return this.membersService.editMemberRole(memberId, workbenchId, dto)
	}

	@Delete(MEMBERS_ROUTES.EXCLUDE_MEMBER)
	@Auth()
	@HttpCode(200)
	excludeMember(
		@Param('memberId') memberId: string,
		@Query('workbenchId') workbenchId: string
	) {
		return this.membersService.excludeMember(memberId, workbenchId)
	}

	@Get(MEMBERS_ROUTES.GET_INVITE_INFO)
	@Auth()
	@HttpCode(200)
	getInviteInfo(
		@Param('memberId') memberId: string,
		@Query('workbenchId') workbenchId: string
	) {
		return this.membersService.getInviteInfo(memberId, workbenchId)
	}

	@Patch(MEMBERS_ROUTES.ACCEPT_INVITE)
	@Auth()
	@HttpCode(200)
	acceptInvite(
		@Param('memberId') memberId: string,
		@Query('workbenchId') workbenchId: string
	) {
		return this.membersService.acceptInvite(memberId, workbenchId)
	}
}
