import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/core/database/database.service'

@Injectable()
export class NotificationsService {
	constructor(private readonly database: DatabaseService) {}

	async getNotifications(userId: string) {
		return this.database.notification.findMany({
			where: {
				userId
			}
		})
	}

	async sendNotification(
		userId: string,
		content: string,
		title: string,
		taskId?: string
	) {
		return this.database.notification.create({
			data: {
				userId,
				content,
				title,
				taskId
			}
		})
	}

	async readNotification(userId: string, notificationId: string) {
		return this.database.notification.update({
			where: {
				id: notificationId
			},
			data: {
				type: 'READ'
			}
		})
	}

	async archiveNotification(userId: string, notificationId: string) {
		return this.database.notification.update({
			where: {
				id: notificationId
			},
			data: {
				type: 'ARCHIVED'
			}
		})
	}
}
