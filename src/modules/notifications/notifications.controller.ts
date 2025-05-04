import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { CurrentUser } from 'src/shared/decorators/current.user.decorator'

import { NotificationsService } from './notifications.service'

export const NOTIFICATIONS_ROUTES = {
	INDEX: 'notifications',
	GET_NOTIFICATIONS: '',
	SEND_NOTIFICATION: '',
	READ_NOTIFICATION: ':notificationId/read',
	ARCHIVE_NOTIFICATION: ':notificationId/archive'
}

export class SendNotificationDto {
	@IsNotEmpty()
	@ApiProperty()
	@IsString()
	title: string

	@IsNotEmpty()
	@ApiProperty()
	@IsString()
	content: string

	@IsOptional()
	@ApiProperty()
	@IsUUID()
	taskId?: string
}

@Controller(NOTIFICATIONS_ROUTES.INDEX)
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Get(NOTIFICATIONS_ROUTES.GET_NOTIFICATIONS)
	@Auth()
	@HttpCode(200)
	async getNotifications(@CurrentUser('id') userId: string) {
		if (!userId) {
			throw new Error('User ID not found in request context.')
		}
		return this.notificationsService.getNotifications(userId)
	}

	@Post(NOTIFICATIONS_ROUTES.SEND_NOTIFICATION)
	@Auth()
	@HttpCode(201)
	async sendNotification(
		@CurrentUser('id') userId: string,
		@Body() dto: SendNotificationDto
	) {
		if (!userId) {
			throw new Error('User ID not found in request context.')
		}
		return this.notificationsService.sendNotification(
			userId,
			dto.content,
			dto.title,
			dto.taskId
		)
	}

	@Patch(NOTIFICATIONS_ROUTES.READ_NOTIFICATION)
	@Auth()
	@HttpCode(200)
	async readNotification(
		@CurrentUser('id') userId: string,
		@Param('notificationId') notificationId: string
	) {
		if (!userId) {
			throw new Error('User ID not found in request context.')
		}
		return this.notificationsService.readNotification(userId, notificationId)
	}

	@Patch(NOTIFICATIONS_ROUTES.ARCHIVE_NOTIFICATION)
	@Auth()
	@HttpCode(200)
	async archiveNotification(
		@CurrentUser('id') userId: string,
		@Param('notificationId') notificationId: string
	) {
		if (!userId) {
			throw new Error('User ID not found in request context.')
		}
		return this.notificationsService.archiveNotification(userId, notificationId)
	}
}
