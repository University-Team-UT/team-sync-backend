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

import { PROJECT_ROUTES } from './config/project.routes'
import { CreateProjectDto } from './dto/project.dto'
import { ProjectService } from './project.service'

@Controller(PROJECT_ROUTES.INDEX)
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Get(PROJECT_ROUTES.GET_BY_WORKBENCH_ID)
	@Auth()
	@HttpCode(200)
	async getProjectsByWorkbench(@Param('workbenchId') workbenchId: string) {
		return this.projectService.getWorkbenchProjects(workbenchId)
	}

	@Post(PROJECT_ROUTES.CREATE)
	@Auth()
	@HttpCode(200)
	async createProject(
		@Param('workbenchId') workbenchId: string,
		@Body() dto: CreateProjectDto
	) {
		return this.projectService.createProject(workbenchId, dto.title)
	}

	@Patch(PROJECT_ROUTES.UPDATE)
	@Auth()
	@HttpCode(200)
	async updateProject(
		@Param('projectId') projectId: string,
		@Body() dto: CreateProjectDto
	) {
		return this.projectService.updateProject(projectId, dto.title)
	}

	@Delete(PROJECT_ROUTES.DELETE)
	@Auth()
	@HttpCode(200)
	async deleteProject(@Param('projectId') projectId: string) {
		return this.projectService.deleteProject(projectId)
	}
}
