import {
  Body,
  Res,
  Controller,
  HttpStatus,
  Post,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ConflictException,
  Req
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summery')
  async getDashboardSummery(@Req() req, @Res() res){
    const result = await this.dashboardService.getSummery(req.user.id);
    return res.status(200).json({ success: true, data: result})
  }
}
