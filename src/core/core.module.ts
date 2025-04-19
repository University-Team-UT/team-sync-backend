import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { IS_DEV } from 'src/shared/utils/is-dev'

import { DatabaseModule } from './database/database.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			ignoreEnvFile: !IS_DEV
		}),
		DatabaseModule
	]
})
export class CoreModule {}
