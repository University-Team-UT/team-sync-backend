import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AccountModule } from 'src/modules/account/account.module'
import { AuthorizationModule } from 'src/modules/auth/authorization.module'
import { MediaModule } from 'src/modules/media/media.module'
import { BoardModule } from 'src/modules/project/board/board.module'
import { ColumnsModule } from 'src/modules/project/board/columns/columns.module'
import { ProjectModule } from 'src/modules/project/project.module'
import { TagsModule } from 'src/modules/project/tags/tags.module'
import { TaskModule } from 'src/modules/task/task.module'
import { WorkbenchModule } from 'src/modules/workbench/workbench.module'
import { IS_DEV } from 'src/shared/utils/is-dev'

import { DatabaseModule } from './database/database.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			ignoreEnvFile: !IS_DEV
		}),
		DatabaseModule,
		AuthorizationModule,
		AccountModule,
		WorkbenchModule,
		ProjectModule,
		BoardModule,
		TagsModule,
		TaskModule,
		MediaModule,
		ColumnsModule
	]
})
export class CoreModule {}
