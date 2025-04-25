import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/core/database/database.service'

import {
	CreateColumnDto,
	FilterColumnDto,
	UpdateColumnDto
} from './dto/columns.dto'

@Injectable()
export class ColumnsService {
	constructor(private readonly database: DatabaseService) {}
	async getColumns(boardId: string) {
		return this.database.column.findMany({
			where: {
				boardId
			},
			orderBy: {
				position: 'asc'
			},
			include: {
				tasks: {
					include: {
						subtasks: true
					},
					orderBy: {
						position: 'asc'
					}
				}
			}
		})
	}

	async getFilteredColumns(dto: FilterColumnDto) {
		const filters: any = {
			boardId: dto.boardId
		}

		if (dto.searchTerm?.trim()) {
			filters.title = { contains: dto.searchTerm, mode: 'insensitive' }
		}

		if (dto.status) {
			filters.status = dto.status
		}

		const taskFilters: any = {}

		if (dto.authorsIds?.length) {
			taskFilters.executorId = { in: dto.authorsIds }
		}

		if (dto.priorities?.length) {
			taskFilters.priority = { in: dto.priorities }
		}

		if (dto.tags?.length) {
			taskFilters.tags = { in: dto.tags }
		}

		if (dto.deadline) {
			taskFilters.deadline = dto.deadline
		}

		return this.database.column.findMany({
			where: filters,
			include: {
				tasks: {
					where: taskFilters
				}
			}
		})
	}

	async createColumn(boardId: string, dto: CreateColumnDto) {
		const lastPosition = await this.database.column.aggregate({
			where: { boardId },
			_max: { position: true }
		})

		const newPosition =
			lastPosition._max.position !== null ? lastPosition._max.position + 1 : 0

		return this.database.column.create({
			data: {
				boardId,
				title: dto.title,
				position: newPosition
			}
		})
	}
	async changePosition(columnId: string, newPosition: number) {
		const column = await this.database.column.findUniqueOrThrow({
			where: { id: columnId }
		})

		const columns = await this.database.column.findMany({
			where: { boardId: column.boardId },
			orderBy: { position: 'asc' }
		})

		const maxPosition = columns.length - 1
		const clampedPosition = Math.max(0, Math.min(newPosition, maxPosition))

		if (column.position === clampedPosition) {
			return column
		}

		await this.database.$transaction(async tx => {
			if (column.position < clampedPosition) {
				await tx.column.updateMany({
					where: {
						boardId: column.boardId,
						position: { gt: column.position, lte: clampedPosition }
					},
					data: {
						position: { decrement: 1 }
					}
				})
			} else {
				await tx.column.updateMany({
					where: {
						boardId: column.boardId,
						position: { gte: clampedPosition, lt: column.position }
					},
					data: {
						position: { increment: 1 }
					}
				})
			}

			await tx.column.update({
				where: { id: columnId },
				data: { position: clampedPosition }
			})
		})

		return this.database.column.findUnique({
			where: { id: columnId }
		})
	}

	async updateColumn(columnId: string, dto: UpdateColumnDto) {
		return this.database.column.update({
			where: {
				id: columnId
			},
			data: {
				title: dto.title,
				color: dto.color
			}
		})
	}
	async deleteColumn(columnId: string) {
		return this.database.column.delete({
			where: {
				id: columnId
			}
		})
	}
}
