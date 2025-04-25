import { Injectable } from '@nestjs/common'
import { Priority, Prisma, TaskStatus } from 'generated/prisma'
import { DatabaseService } from 'src/core/database/database.service'

import {
	CreateSubtaskDto,
	CreateTaskDto,
	UpdateSubtaskDto
} from './dto/task.dto'

@Injectable()
export class TaskService {
	constructor(private readonly database: DatabaseService) {}

	async createTask(dto: CreateTaskDto) {
		const task = await this.database.$transaction(async tx => {
			await tx.task.updateMany({
				where: { columnId: dto.columnId },
				data: {
					position: { increment: 1 }
				}
			})

			const data: Prisma.TaskCreateInput = {
				title: dto.title,
				priority: dto.priority,
				column: { connect: { id: dto.columnId } },
				...(dto.executorId && dto.workbenchId
					? {
							executor: {
								connect: {
									userId_workbenchId: {
										userId: dto.executorId,
										workbenchId: dto.workbenchId
									}
								}
							}
						}
					: {}),
				position: 1
			}

			return tx.task.create({ data })
		})

		return task
	}

	async deleteTask(taskId: string) {
		const task = await this.database.task.findUniqueOrThrow({
			where: { id: taskId }
		})

		await this.database.$transaction(async tx => {
			await tx.task.delete({
				where: { id: taskId }
			})

			await tx.task.updateMany({
				where: {
					columnId: task.columnId,
					position: {
						gt: task.position
					}
				},
				data: {
					position: {
						decrement: 1
					}
				}
			})
		})
	}

	async setExecutor(taskId: string, executorId: string) {
		return this.database.task.update({
			where: {
				id: taskId
			},
			data: {
				executorId
			}
		})
	}

	async movePosition(taskId: string, newPosition: number) {
		const task = await this.database.task.findUniqueOrThrow({
			where: { id: taskId }
		})

		const tasks = await this.database.task.findMany({
			where: { columnId: task.columnId },
			orderBy: { position: 'asc' }
		})

		const maxPosition = tasks.length - 1
		const clampedPosition = Math.max(0, Math.min(newPosition, maxPosition))

		if (task.position === clampedPosition) {
			return task
		}

		await this.database.$transaction(async tx => {
			if (task.position < clampedPosition) {
				await tx.task.updateMany({
					where: {
						columnId: task.columnId,
						position: { gt: task.position, lte: clampedPosition }
					},
					data: {
						position: { decrement: 1 }
					}
				})
			} else {
				await tx.task.updateMany({
					where: {
						columnId: task.columnId,
						position: { gte: clampedPosition, lt: task.position }
					},
					data: {
						position: { increment: 1 }
					}
				})
			}

			await tx.task.update({
				where: { id: taskId },
				data: { position: clampedPosition }
			})
		})

		return this.database.task.findUnique({
			where: { id: taskId }
		})
	}

	async setDeadline(taskId: string, deadline: Date) {
		return this.database.task.update({
			where: { id: taskId },
			data: { deadline }
		})
	}
	async setPriority(taskId: string, priority: Priority) {
		return this.database.task.update({
			where: { id: taskId },
			data: { priority }
		})
	}
	async changeStatus(taskId: string, status: TaskStatus) {
		return this.database.task.update({
			where: { id: taskId },
			data: { status }
		})
	}
	async setTag(taskId: string, tagId: string) {
		return this.database.task.update({
			where: { id: taskId },
			data: { tags: { connect: [{ id: tagId }] } }
		})
	}
	async removeTag(taskId: string, tagId: string) {
		return this.database.task.update({
			where: { id: taskId },
			data: { tags: { disconnect: [{ id: tagId }] } }
		})
	}
	async addSubtask(dto: CreateSubtaskDto) {
		return this.database.subtask.create({
			data: {
				...dto
			}
		})
	}
	async removeSubtask(subtaskId: string) {
		return this.database.subtask.delete({
			where: { id: subtaskId }
		})
	}
	async updateSubtask(subtaskId: string, dto: UpdateSubtaskDto) {
		return this.database.subtask.update({
			where: { id: subtaskId },
			data: {
				...dto
			}
		})
	}
}
