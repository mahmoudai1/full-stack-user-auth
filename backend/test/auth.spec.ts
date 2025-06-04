import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { AuthService } from '../src/users/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

describe('Authentication', () => {
  let controller: UsersController;
  let authService: AuthService;
  let usersService: UsersService;

  const mockUser = {
    _id: new Types.ObjectId(),
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedPassword123!',
  } as any;

  const mockSession: { userId: string | null } = {
    userId: null,
  };

  const mockUserModel = {
    findOne: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('signup', () => {
    const signupDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    };

    it('should successfully create a new user', async () => {
      jest.spyOn(authService, 'signup').mockResolvedValue(mockUser);
      
      const result = await controller.createUser(signupDto, mockSession);
      
      expect(result).toEqual(mockUser);
    });

    it('should throw BadRequestException if user already exists', async () => {
      jest.spyOn(authService, 'signup').mockRejectedValue(new BadRequestException('User already exists'));
      
      await expect(controller.createUser(signupDto, mockSession))
        .rejects
        .toThrow(BadRequestException);
    });

    it('should validate password requirements', async () => {
      const invalidDto = { ...signupDto, password: '123' };
      
      await expect(controller.createUser(invalidDto, mockSession))
        .rejects
        .toThrow();
    });

    it('should validate email format', async () => {
      const invalidDto = { ...signupDto, email: 'invalid-email' };
      
      await expect(controller.createUser(invalidDto, mockSession))
        .rejects
        .toThrow();
    });
  });

  describe('signin', () => {
    const signinDto = {
      email: 'test@example.com',
      password: 'Password123!',
    };

    it('should successfully sign in an existing user', async () => {
      jest.spyOn(authService, 'signin').mockResolvedValue(mockUser);
      
      const result = await controller.loginUser(signinDto, mockSession);
      
      expect(result).toEqual(mockUser);
      expect(mockSession.userId).toEqual(mockUser._id);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(authService, 'signin').mockRejectedValue(new NotFoundException('User not found'));
      
      await expect(controller.loginUser(signinDto, mockSession))
        .rejects
        .toThrow(NotFoundException);
    });

    it('should throw BadRequestException for incorrect password', async () => {
      jest.spyOn(authService, 'signin').mockRejectedValue(new BadRequestException('Wrong email or password'));
      
      await expect(controller.loginUser(signinDto, mockSession))
        .rejects
        .toThrow(BadRequestException);
    });

    it('should validate login credentials format', async () => {
      const invalidDto = { email: 'invalid-email', password: '' };
      
      await expect(controller.loginUser(invalidDto, mockSession))
        .rejects
        .toThrow();
    });
  });
}); 