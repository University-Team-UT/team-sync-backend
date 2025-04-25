import { Module } from '@nestjs/common'
import { NotificationsService } from 'src/modules/notifications/notifications.service'

import { MembersController } from './members.controller'
import { MembersService } from './members.service'

@Module({
	controllers: [MembersController],
	providers: [MembersService, NotificationsService]
})
export class MembersModule {}
