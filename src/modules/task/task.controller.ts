import {
	Body,
	Controller,
	Delete,
	HttpCode,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { Priority, TaskStatus } from '@prisma/client'
import { Auth } from 'src/shared/decorators/auth.decorator'

import { TASK_ROUTES } from './config/task.routes'
import {
	CreateSubtaskDto,
	CreateTaskDto,
	UpdateSubtaskDto,
	UpdateTaskDto
} from './dto/task.dto'
import { TaskService } from './task.service'

@Controller(TASK_ROUTES.INDEX)
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post(TASK_ROUTES.CREATE_TASK)
	@Auth()
	@HttpCode(200)
	async createTask(@Body() dto: CreateTaskDto) {
		return this.taskService.createTask(dto)
	}

	@Patch(TASK_ROUTES.SET_EXECUTOR)
	@Auth()
	@HttpCode(200)
	async setExecutor(
		@Param('taskId') taskId: string,
		@Body() { executorId }: { executorId: string | null }
	) {
		return this.taskService.setExecutor(taskId, executorId)
	}

	@Patch(TASK_ROUTES.MOVE_POSITION)
	@Auth()
	@HttpCode(200)
	async movePosition(
		@Param('taskId') taskId: string,
		@Body() { position }: { position: number }
	) {
		return this.taskService.movePosition(taskId, position)
	}

	@Patch(TASK_ROUTES.SET_DEADLINE)
	@Auth()
	@HttpCode(200)
	async setDeadline(
		@Param('taskId') taskId: string,
		@Body() { deadline }: { deadline: Date }
	) {
		return this.taskService.setDeadline(taskId, deadline)
	}

	@Patch(TASK_ROUTES.SET_PRIORITY)
	@Auth()
	@HttpCode(200)
	async setPriority(
		@Param('taskId') taskId: string,
		@Body() { priority }: { priority: Priority }
	) {
		return this.taskService.setPriority(taskId, priority)
	}

	@Patch(TASK_ROUTES.CHANGE_STATUS)
	@Auth()
	@HttpCode(200)
	async changeStatus(
		@Param('taskId') taskId: string,
		@Body() { status }: { status: TaskStatus }
	) {
		return this.taskService.changeStatus(taskId, status)
	}

	@Patch(TASK_ROUTES.SET_TAG)
	@Auth()
	@HttpCode(200)
	async setTag(
		@Param('taskId') taskId: string,
		@Body() { tagId }: { tagId: string }
	) {
		return this.taskService.setTag(taskId, tagId)
	}

	@Patch(TASK_ROUTES.REMOVE_TAG)
	@Auth()
	@HttpCode(200)
	async removeTag(
		@Param('taskId') taskId: string,
		@Body() { tagId }: { tagId: string }
	) {
		return this.taskService.removeTag(taskId, tagId)
	}

	@Post(TASK_ROUTES.CREATE_SUBTASK)
	@Auth()
	@HttpCode(200)
	async addSubtask(@Body() dto: CreateSubtaskDto) {
		return this.taskService.addSubtask(dto)
	}

	@Patch(TASK_ROUTES.UPDATE_SUBTASK)
	@Auth()
	@HttpCode(200)
	async updateSubtask(
		@Body() dto: UpdateSubtaskDto,
		@Param('subtaskId') subtaskId: string
	) {
		return this.taskService.updateSubtask(subtaskId, dto)
	}

	@Delete(TASK_ROUTES.DELETE_SUBTASK)
	@Auth()
	@HttpCode(200)
	async deleteSubtask(@Param('subtaskId') subtaskId: string) {
		return this.taskService.removeSubtask(subtaskId)
	}

	@Delete(TASK_ROUTES.DELETE_TASK)
	@Auth()
	@HttpCode(200)
	async deleteTask(@Param('taskId') taskId: string) {
		return this.taskService.deleteTask(taskId)
	}
	@Patch('toggle-subtask/:subtaskId')
	@Auth()
	@HttpCode(200)
	async toggleSubtask(
		@Param('subtaskId') taskId: string,
		@Body() { isCompleted }: { isCompleted: boolean }
	) {
		return this.taskService.toggleCompleteSubtask(taskId, isCompleted)
	}

	@Patch('update-task/:taskId')
	@Auth()
	@HttpCode(200)
	async updateTask(
		@Param('taskId') taskId: string,
		@Body() dto: UpdateTaskDto
	) {
		return this.taskService.updateTask(taskId, dto)
	}
}
