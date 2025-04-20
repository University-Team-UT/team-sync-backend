import { Controller } from '@nestjs/common';
import { WorkbenchService } from './workbench.service';

@Controller('workbench')
export class WorkbenchController {
  constructor(private readonly workbenchService: WorkbenchService) {}
}
