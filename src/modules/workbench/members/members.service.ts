import {
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { WorkbenchRole } from '@prisma/client'
import { DatabaseService } from 'src/core/database/database.service'
import { NotificationsService } from 'src/modules/notifications/notifications.service'

import { EditMemberDto, InviteUsersDto } from './dto/members.dto'

@Injectable()
export class MembersService {
	allowedOrigin: string
	constructor(
		private readonly database: DatabaseService,
		private readonly configService: ConfigService,
		private readonly notificationsService: NotificationsService
	) {
		this.allowedOrigin = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
	}

	async getWorkbenchMembers(workbenchId: string) {
		return this.database.workbenchMember.findMany({
			where: {
				workbenchId
			},
			include: {
				user: true
			}
		})
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
		const emails = dto.emails.map(invite => invite.email)

		const users = await this.database.user.findMany({
			where: {
				email: {
					in: emails
				}
			}
		})

		const foundEmails = users.map(user => user.email)
		const unusedEmails = emails.filter(email => !foundEmails.includes(email))

		const workbench = await this.database.workbench.findUnique({
			where: {
				id: dto.workbenchId
			}
		})

		await Promise.all(
			users.map(user =>
				this.notificationsService.sendNotification(
					user.id,
					`Вы были приглашены в рабочее пространство ${workbench?.title} \n
					ссылка -  ${this.generateInviteLink(dto.workbenchId, dto.inviterId)}`,
					'Новое приглашение'
				)
			)
		)

		if (unusedEmails.length) {
			throw new NotFoundException(
				`Пользователи с указанными email-адресами не найдены: ${unusedEmails.join(', ')}. Для их приглашения используйте ссылку приглашения.`
			)
		}
	}

	async editMemberRole(
		memberId: string,
		workbenchId: string,
		dto: EditMemberDto
	) {
		const member = await this.database.workbenchMember.findUnique({
			where: {
				userId_workbenchId: {
					userId: memberId,
					workbenchId
				}
			}
		})

		if (!member) throw new NotFoundException('Участник не найден')

		await this.database.workbenchMember.update({
			where: {
				userId_workbenchId: {
					userId: memberId,
					workbenchId
				}
			},
			data: {
				role: dto.role
			}
		})
	}
	async excludeMember(
		workbenchId: string,
		memberId: string,
		callerUserId: string
	) {
		const workbench = await this.database.workbench.findUnique({
			where: { id: workbenchId },
			include: {
				members: {
					where: {
						userId: { in: [memberId, callerUserId] }
					}
				}
			}
		})

		if (!workbench) {
			throw new NotFoundException('Рабочее пространство не найдено')
		}

		const callerMembership = workbench.members.find(
			m => m.userId === callerUserId
		)
		const targetMembership = workbench.members.find(m => m.userId === memberId)

		if (!callerMembership) {
			throw new ForbiddenException(
				'Вы не являетесь участником этого рабочего пространства'
			)
		}

		if (!targetMembership) {
			throw new NotFoundException(
				'Указанный пользователь не найден в этом рабочем пространстве'
			)
		}

		if (callerUserId === memberId) {
			if (targetMembership.role === WorkbenchRole.ADMIN) {
				throw new ForbiddenException(
					'Администратор не может исключить сам себя этим методом.'
				)
			}
		} else {
			if (callerMembership.role !== WorkbenchRole.ADMIN) {
				throw new ForbiddenException(
					'У вас нет прав на исключение участников из этого рабочего пространства'
				)
			}

			if (targetMembership.role === WorkbenchRole.ADMIN) {
				throw new ForbiddenException(
					'Нельзя исключить администратора рабочего пространства'
				)
			}
		}

		await this.database.workbenchMember.delete({
			where: {
				userId_workbenchId: {
					userId: memberId,
					workbenchId: workbenchId
				}
			}
		})
	}
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
	async acceptInvite(userId: string, workbenchId: string) {
		const workbench = await this.database.workbench.findUnique({
			where: {
				id: workbenchId
			}
		})
		if (!workbench)
			throw new NotFoundException('Рабочее пространство не найдено')
		const user = await this.database.user.findUnique({
			where: {
				id: userId
			}
		})
		if (!user) throw new NotFoundException('Пользователь не найден')
		await this.database.workbench.update({
			where: {
				id: workbenchId
			},
			data: {
				members: {
					create: {
						userId: user.id,
						role: 'WORKER'
					}
				}
			}
		})
		return true
	}
	generateInviteLink(workbenchId: string, inviterId: string) {
		return `${this.allowedOrigin}/invite/?w-id=${workbenchId}&inv-id=${inviterId}`
	}
}
