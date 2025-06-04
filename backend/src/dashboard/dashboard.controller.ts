import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('dashboard')
export class DashboardController {
  @Get('/')
  @UseGuards(AuthGuard)
  getDashboard(@Session() session: any) {
    return { message: 'Dashboard', user: session.userId };
  }
}
