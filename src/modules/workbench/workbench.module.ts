import { Module } from '@nestjs/common';
import { WorkbenchService } from './workbench.service';
import { WorkbenchController } from './workbench.controller';
import { MembersModule } from './members/members.module';

@Module({
  controllers: [WorkbenchController],
  providers: [WorkbenchService],
  imports: [MembersModule],
})
export class WorkbenchModule {}
