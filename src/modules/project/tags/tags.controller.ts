import {
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { Auth } from 'src/shared/decorators/auth.decorator'

import { TAGS_ROUTES } from './config/tags.routes'
import { CreateTagDto, UpdateTagDto } from './dto/tags.dto'
import { TagsService } from './tags.service'

@Controller(TAGS_ROUTES.INDEX)
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@Get(TAGS_ROUTES.GET_TAGS_BY_PROJECT)
	@Auth()
	@HttpCode(200)
	async getTagsByProjectId(@Param('projectId') projectId: string) {
		return this.tagsService.getTagsByProjectId(projectId)
	}

	@Post(TAGS_ROUTES.CREATE_TAG)
	@Auth()
	@HttpCode(200)
	async createTag(@Param('taskId') taskId: string, dto: CreateTagDto) {
		return this.tagsService.createTag(taskId, dto)
	}

	@Patch(TAGS_ROUTES.UPDATE_TAG)
	@Auth()
	@HttpCode(200)
	async updateTag(@Param('tagId') tagId: string, dto: UpdateTagDto) {
		return this.tagsService.updateTag(tagId, dto)
	}

	@Delete(TAGS_ROUTES.DELETE_TAG)
	@Auth()
	@HttpCode(200)
	async deleteTag(@Param('tagId') tagId: string) {
		return this.tagsService.deleteTag(tagId)
	}

	@Patch(TAGS_ROUTES.ASSIGN_TAG)
	@Auth()
	@HttpCode(200)
	async assignTagToTask(
		@Param('taskId') taskId: string,
		@Param('tagId') tagId: string
	) {
		return this.tagsService.assignTagToTask(taskId, tagId)
	}

	@Patch(TAGS_ROUTES.UNASSIGN_TAG)
	@Auth()
	@HttpCode(200)
	async unAssignTagToTask(
		@Param('taskId') taskId: string,
		@Param('tagId') tagId: string
	) {
		return this.tagsService.unAssignTagFromTask(taskId, tagId)
	}
}
