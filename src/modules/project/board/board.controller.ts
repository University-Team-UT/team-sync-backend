import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { Auth } from 'src/shared/decorators/auth.decorator'

import { BoardService } from './board.service'
import { BOARD_ROUTES } from './config/board.routes'

class BoardDto {
	@ApiProperty()
	@IsString()
	title: string
}

@Controller(BOARD_ROUTES.INDEX)
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@Get(BOARD_ROUTES.GET_BOARDS)
	@Auth()
	@HttpCode(200)
	async getBoards(@Param('projectId') projectId: string) {
		return this.boardService.getBoards(projectId)
	}

	@Get(BOARD_ROUTES.GET_BOARD)
	@Auth()
	@HttpCode(200)
	async getBoard(@Param('boardId') boardId: string) {
		return this.boardService.getBoard(boardId)
	}

	@Post(BOARD_ROUTES.CREATE_BOARD)
	@Auth()
	@HttpCode(200)
	async createBoard(
		@Param('projectId') projectId: string,
		@Body() dto: BoardDto
	) {
		return this.boardService.createBoard(projectId, dto.title)
	}

	@Patch(BOARD_ROUTES.UPDATE_BOARD)
	@Auth()
	@HttpCode(200)
	async updateBoard(@Param('boardId') boardId: string, @Body() dto: BoardDto) {
		return this.boardService.updateBoard(boardId, dto.title)
	}

	@Delete(BOARD_ROUTES.DELETE_BOARD)
	@Auth()
	@HttpCode(200)
	async deleteBoard(@Param('boardId') boardId: string) {
		return this.boardService.deleteBoard(boardId)
	}
}
