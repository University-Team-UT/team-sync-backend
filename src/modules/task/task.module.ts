import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { CommentsModule } from './comments/comments.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [CommentsModule],
})
export class TaskModule {}
