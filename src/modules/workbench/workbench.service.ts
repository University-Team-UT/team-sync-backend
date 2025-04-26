import { BadRequestException, Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/core/database/database.service'

import { CreateWorkbenchDto, UpdateWorkbenchDto } from './dto/workbench.dto'

@Injectable()
export class WorkbenchService {
	constructor(private readonly database: DatabaseService) {}

	async getWorkbenchesByUserId(userId: string) {
		const workbenches = await this.database.workbench.findMany({
			where: {
				members: {
					some: { userId }
				}
			},
			include: {
				_count: {
					select: { members: true }
				}
			}
		})

		return workbenches
	}
	async createWorkbench(dto: CreateWorkbenchDto, userId: string) {
		const user = await this.database.user.findUnique({
			where: {
				id: userId
			}
		})
		if (!user) throw new BadRequestException('Пользователь не найден')

		const workbench = await this.database.workbench.create({
			data: {
				title: dto.title,
				description: dto.description,
				members: {
					create: { userId: userId, role: 'ADMIN' }
				}
			},
			include: {
				members: true
			}
		})

		return workbench
	}
	async updateWorkbench(dto: UpdateWorkbenchDto) {
		const workbench = await this.database.workbench.update({
			where: { id: dto.workbenchId },
			data: {
				title: dto.title,
				description: dto.description
			},
			include: {
				members: true
			}
		})

		return workbench
	}
	async deleteWorkbench(id: string) {
		await this.database.workbench.delete({
			where: { id }
		})
	}
}
