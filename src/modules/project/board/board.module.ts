import { Module } from '@nestjs/common'

import { BoardController } from './board.controller'
import { BoardService } from './board.service'
import { ColumnsModule } from './columns/columns.module'

@Module({
	controllers: [BoardController],
	providers: [BoardService],
	imports: [ColumnsModule]
})
export class BoardModule {}
