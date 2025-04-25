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
import { Auth } from 'src/shared/decorators/auth.decorator'
import { CurrentUser } from 'src/shared/decorators/current.user.decorator'

import { WORKBENCH_ROUTES } from './config/workbench.routes'
import { CreateWorkbenchDto, UpdateWorkbenchDto } from './dto/workbench.dto'
import { WorkbenchService } from './workbench.service'

@Controller(WORKBENCH_ROUTES.INDEX)
export class WorkbenchController {
	constructor(private readonly workbenchService: WorkbenchService) {}

	@Auth()
	@Get()
	@HttpCode(200)
	getWorkbenchesByUserId(@CurrentUser('id') id: string) {
		return this.workbenchService.getWorkbenchesByUserId(id)
	}

	@Auth()
	@Post(WORKBENCH_ROUTES.CREATE)
	@HttpCode(200)
	createWorkbench(
		@CurrentUser('id') id: string,
		@Body() dto: CreateWorkbenchDto
	) {
		return this.workbenchService.createWorkbench(dto, id)
	}

	@Auth()
	@Patch(WORKBENCH_ROUTES.UPDATE)
	@HttpCode(200)
	updateWorkbench(@Body() dto: UpdateWorkbenchDto) {
		return this.workbenchService.updateWorkbench(dto)
	}

	@Auth()
	@Delete(WORKBENCH_ROUTES.DELETE)
	@HttpCode(200)
	deleteWorkbench(@Param('id') id: string) {
		return this.workbenchService.deleteWorkbench(id)
	}
}
