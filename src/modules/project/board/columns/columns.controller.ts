import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common'
import { Auth } from 'src/shared/decorators/auth.decorator'

import { ColumnsService } from './columns.service'
import { COLUMNS_ROUTES } from './config/columns.routes'
import {
	ChangeColumnPositionDto,
	CreateColumnDto,
	FilterColumnDto,
	UpdateColumnDto
} from './dto/columns.dto'

@Controller(COLUMNS_ROUTES.INDEX)
export class ColumnsController {
	constructor(private readonly columnsService: ColumnsService) {}

	@Get(COLUMNS_ROUTES.GET_COLUMNS)
	@Auth()
	@HttpCode(200)
	async getColumns(@Param('boardId') boardId: string) {
		return this.columnsService.getColumns(boardId)
	}

	@Get(COLUMNS_ROUTES.GET_FILTERED_COLUMNS)
	@Auth()
	@HttpCode(200)
	async getFilteredColumns(@Query() dto: FilterColumnDto) {
		return this.columnsService.getFilteredColumns(dto)
	}

	@Post(COLUMNS_ROUTES.CREATE_COLUMN)
	@Auth()
	@HttpCode(200)
	async createColumn(
		@Param('boardId') boardId: string,
		@Body() dto: CreateColumnDto
	) {
		return this.columnsService.createColumn(boardId, dto)
	}

	@Patch(COLUMNS_ROUTES.UPDATE_COLUMN)
	@Auth()
	@HttpCode(200)
	async updateColumn(
		@Param('columnId') columnId: string,
		@Body() dto: UpdateColumnDto
	) {
		return this.columnsService.updateColumn(columnId, dto)
	}

	@Patch(COLUMNS_ROUTES.CHANGE_POSITION)
	@Auth()
	@HttpCode(200)
	async changeColumnPosition(
		@Param('columnId') columnId: string,
		@Body() dto: ChangeColumnPositionDto
	) {
		return this.columnsService.changePosition(columnId, dto.newPosition)
	}

	@Delete(COLUMNS_ROUTES.DELETE_COLUMN)
	@Auth()
	@HttpCode(200)
	async deleteColumn(@Param('columnId') columnId: string) {
		return this.columnsService.deleteColumn(columnId)
	}
}
