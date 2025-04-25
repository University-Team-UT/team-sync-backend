import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post
} from '@nestjs/common'
import { Auth } from 'src/shared/decorators/auth.decorator'

import { CommentsService } from './comments.service'
import { COMMENT_ROUTES } from './config/comments.routes'
import { CreateCommentDto } from './dto/comments.dto'

@Controller(COMMENT_ROUTES.INDEX)
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Get(COMMENT_ROUTES.GET)
	@Auth()
	@HttpCode(200)
	async getCommentsByTaskId(@Param('taskId') taskId: string) {
		return this.commentsService.getComments(taskId)
	}

	@Post(COMMENT_ROUTES.SEND)
	@Auth()
	@HttpCode(200)
	async sendComment(
		@Param('taskId') taskId: string,
		@Param('workbenchId') workbenchId: string,
		@Body() dto: CreateCommentDto
	) {
		return this.commentsService.sendComment(taskId, workbenchId, dto)
	}

	@Delete(COMMENT_ROUTES.DELETE)
	@Auth()
	@HttpCode(200)
	async deleteComment(
		@Param('commentId') commentId: string,
		@Param('userId') userId: string,
		@Param('workbenchId') workbenchId: string
	) {
		return this.commentsService.deleteComment(commentId, userId, workbenchId)
	}
}
