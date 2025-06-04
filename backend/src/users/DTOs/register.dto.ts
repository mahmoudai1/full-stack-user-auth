import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
} from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/, {
    message:
      'Password must contain at least one letter, one number and one special character',
  })
  password: string;

  // @IsString()
  // @IsNotEmpty()
  // @MinLength(8)
  // @Match('password', { message: 'Passwords do not match' })
  // confirmPassword: string;
}
