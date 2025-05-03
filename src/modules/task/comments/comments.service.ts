import { BadRequestException, Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/core/database/database.service'

import { CreateCommentDto, EditCommentDto } from './dto/comments.dto'

@Injectable()
export class CommentsService {
	constructor(private readonly database: DatabaseService) {}

	async getComments(taskId: string) {
		return this.database.comment.findMany({
			where: {
				taskId
			},
			include: {
				author: true
			}
		})
	}
	async sendComment(
		taskId: string,
		workbenchId: string,
		dto: CreateCommentDto
	) {
		return this.database.comment.create({
			data: {
				...dto,
				taskId,
				workbenchId
			}
		})
	}

	async deleteComment(commentId: string, userId: string, workbenchId: string) {
		const comment = await this.database.comment.findUniqueOrThrow({
			where: { id: commentId }
		})

		const member = await this.database.workbenchMember.findUnique({
			where: {
				userId_workbenchId: {
					userId,
					workbenchId: workbenchId
				}
			}
		})

		if (!member) {
			throw new BadRequestException('Вы не участник этого проекта')
		}

		if (comment.authorId !== userId && member.role !== 'ADMIN') {
			throw new BadRequestException('Вам не доступно удалять чужие комментарии')
		}

		return this.database.comment.delete({
			where: { id: commentId }
		})
	}

	async editComment(commentId: string, dto: EditCommentDto) {
		return this.database.comment.update({
			where: { id: commentId },
			data: dto
		})
	}
}
