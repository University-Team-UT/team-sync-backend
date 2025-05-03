import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/core/database/database.service'

@Injectable()
export class BoardService {
	constructor(private readonly database: DatabaseService) {}

	async getBoards(projectId: string) {
		return this.database.board.findMany({
			where: {
				projectId
			}
		})
	}

	async getBoard(boardId: string) {
		return this.database.board.findUnique({
			where: {
				id: boardId
			},
			include: {
				columns: {
					include: {
						tasks: {
							include: {
								subtasks: true,
								column: true
							}
						}
					}
				}
			}
		})
	}

	async createBoard(projectId: string, title: string) {
		return this.database.board.create({
			data: {
				projectId,
				title
			}
		})
	}
	async updateBoard(boardId: string, title: string) {
		return this.database.board.update({
			where: {
				id: boardId
			},
			data: {
				title
			}
		})
	}
	async deleteBoard(boardId: string) {
		return this.database.board.delete({
			where: {
				id: boardId
			}
		})
	}
}
