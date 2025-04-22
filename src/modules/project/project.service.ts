import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/core/database/database.service'

@Injectable()
export class ProjectService {
	constructor(private readonly database: DatabaseService) {}

	async getWorkbenchProjects(workbenchId: string) {
		return this.database.project.findMany({
			where: {
				workbenchId
			}
		})
	}
	async createProject(workbenchId: string, title: string) {
		return this.database.project.create({
			data: {
				workbenchId,
				title
			}
		})
	}
	async updateProject(projectId: string, title: string) {
		return this.database.project.update({
			where: {
				id: projectId
			},
			data: {
				title
			}
		})
	}
	async deleteProject(projectId: string) {
		return this.database.project.delete({
			where: {
				id: projectId
			}
		})
	}
}
