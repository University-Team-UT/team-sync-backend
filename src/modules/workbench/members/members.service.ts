import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DatabaseService } from 'src/core/database/database.service'

import { InviteUsersDto } from './dto/members.dto'

@Injectable()
export class MembersService {
	allowedOrigin: string
	constructor(
		private readonly database: DatabaseService,
		private readonly configService: ConfigService
	) {
		this.allowedOrigin = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
	}

	async getInviteLink(inviterId: string, workbenchId: string) {
		const workbench = await this.database.workbench.findUnique({
			where: {
				id: workbenchId
			},
			include: {
				members: {
					where: {
						userId: inviterId
					}
				}
			}
		})
		if (!workbench)
			throw new NotFoundException('Рабочее пространство не найдено')

		if (workbench.members[0].role !== 'ADMIN')
			throw new UnauthorizedException('У пользователя нет прав администратора')
		return this.generateInviteLink(workbenchId, inviterId)
	}
	async inviteUsers(dto: InviteUsersDto) {
		const users = await this.database.user.findMany({
			where: {
				email: {
					in: dto.emails
				}
			}
		})
		const workbench = await this.database.workbench.findUnique({
			where: {
				id: dto.workbenchId
			}
		})
		//TODO SEND NOTIFICATION
	}
	async editMemberRole() {}
	async excludeMember() {}
	async getInviteInfo(workbenchId: string, inviterId: string) {
		const workbench = await this.database.workbench.findFirst({
			where: {
				id: workbenchId
			},
			select: {
				id: true,
				title: true
			}
		})
		const user = await this.database.user.findUnique({
			where: {
				id: inviterId
			},
			select: {
				id: true,
				email: true,
				displayName: true
			}
		})
		return {
			workbench,
			user
		}
	}
	async acceptInvite() {}
	generateInviteLink(workbenchId: string, inviterId: string) {
		return `${this.allowedOrigin}/invite/?w-id=${workbenchId}&inv-id=${inviterId}`
	}
}
