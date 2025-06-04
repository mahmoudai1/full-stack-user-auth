import { Controller, Body, Post, HttpStatus, UseInterceptors, Session, Get } from '@nestjs/common';
import { ApiCustomResponse } from '../common/decorators/api-response.decorator';
import { UserDto } from './DTOs/user.dto';
import { Serialize } from '../common/decorators/serialize.decorator';
import { AuthService } from './auth/auth.service';
import { UserDocument } from 'schemas/user.schema';
import { RegisterDto } from './DTOs/register.dto';
import { LoginDto } from './DTOs/login.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}
  
  @ApiCustomResponse({
    message: 'User created successfully',
    statusCode: HttpStatus.CREATED,
  })
  @Post('/signup')
  async createUser(@Body() body: RegisterDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password, body.name);
    // session.userId = user._id;
    return user;
  }

  @ApiCustomResponse({
    message: 'User logged in successfully',
    statusCode: HttpStatus.OK,
  })
  @Post('/signin')
  async loginUser(@Body() body: LoginDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user._id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  // @UseInterceptors(CurrentUserInterceptor)
  @Get('/me')
  whoAmI(@CurrentUser() user: UserDocument) {
    return user;
  }
}
