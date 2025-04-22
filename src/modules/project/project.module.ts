import { Module } from '@nestjs/common'

import { BoardModule } from './board/board.module'
import { ProjectController } from './project.controller'
import { ProjectService } from './project.service'
import { TagsModule } from './tags/tags.module'

@Module({
	controllers: [ProjectController],
	providers: [ProjectService],
	imports: [BoardModule, TagsModule]
})
export class ProjectModule {}
