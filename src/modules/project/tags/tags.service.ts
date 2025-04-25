import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/core/database/database.service'

import { CreateTagDto, UpdateTagDto } from './dto/tags.dto'

@Injectable()
export class TagsService {
	constructor(private readonly database: DatabaseService) {}

	async getTagsByProjectId(workbenchId: string) {
		const [tasksWithTags, workbenchWithTags] = await Promise.all([
			this.database.task.findMany({
				where: { workbenchId },
				select: { tags: true }
			}),
			this.database.workbench.findUnique({
				where: { id: workbenchId },
				select: { tags: true }
			})
		])

		const taskTags = tasksWithTags.flatMap(task => task.tags)

		const workbenchTags = workbenchWithTags?.tags ?? []

		const allTags = [...taskTags, ...workbenchTags]
		const uniqueTags = allTags.filter(
			(tag, index, self) => index === self.findIndex(t => t.id === tag.id)
		)

		return uniqueTags
	}

	async assignTagToTask(taskId: string, tagId: string) {
		return this.database.task.update({
			where: {
				id: taskId
			},
			data: {
				tags: {
					connect: {
						id: tagId
					}
				}
			}
		})
	}

	async unAssignTagFromTask(taskId: string, tagId: string) {
		return this.database.task.update({
			where: {
				id: taskId
			},
			data: {
				tags: {
					disconnect: {
						id: tagId
					}
				}
			}
		})
	}

	async createTag(workbenchId: string, dto: CreateTagDto) {
		const tag = await this.database.tag.create({
			data: {
				title: dto.title,
				color: dto.color,
				workbenchId: workbenchId
			}
		})

		return tag
	}

	async deleteTag(id: string) {
		return this.database.tag.delete({
			where: {
				id
			}
		})
	}

	async updateTag(id: string, dto: UpdateTagDto) {
		return this.database.tag.update({
			where: {
				id
			},
			data: {
				title: dto.title,
				color: dto.color
			}
		})
	}
}
