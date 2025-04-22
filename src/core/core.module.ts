import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AccountModule } from 'src/modules/account/account.module'
import { AuthorizationModule } from 'src/modules/auth/authorization.module'
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
		WorkbenchModule
	]
})
export class CoreModule {}
