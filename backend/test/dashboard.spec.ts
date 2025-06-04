import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from '../src/dashboard/dashboard.controller';
import { UnauthorizedException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthGuard } from '../src/common/guards/auth.guard';

describe('Dashboard', () => {
  let app: INestApplication;
  let controller: DashboardController;

  const mockSession: { userId: string | null } = {
    userId: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [AuthGuard]
    }).compile();

    app = module.createNestApplication();
    
    // Add session middleware
    app.use((req: any, res: any, next: any) => {
      req.session = mockSession;
      next();
    });

    await app.init();
    controller = module.get<DashboardController>(DashboardController);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('getDashboard', () => {
    it('should return dashboard data for authenticated user', async () => {
      mockSession.userId = 'user-123';
      
      const response = await request(app.getHttpServer())
        .get('/dashboard')
        .expect(200);

      expect(response.body).toEqual({
        message: 'Dashboard',
        user: mockSession.userId,
      });
    });

    it('should throw UnauthorizedException for unauthenticated user', async () => {
      mockSession.userId = null;

      await request(app.getHttpServer())
        .get('/dashboard')
        .expect(401);
    });
  });
}); 