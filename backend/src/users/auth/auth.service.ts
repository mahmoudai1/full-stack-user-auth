import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users.service";
import { promisify } from 'util';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private scryptAsync = promisify(crypto.scrypt);

  constructor(private readonly usersService: UsersService) {}

  async signup(email: string, password: string, name: string) {
    if (await this.userExists(email)) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashPassword(password);
    const user = await this.usersService.create(name, email, hashedPassword);
    return user;
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (await this.comparePasswords(password, user.password)) {
      return user;
    }
    
    throw new BadRequestException('Wrong email or password');
  }

  private async userExists(email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    return user !== null;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = (await this.scryptAsync(password, salt, 64)) as Buffer;
    return hash.toString('hex') + '.' + salt;
  }

  private async comparePasswords(password: string, hashedPassword: string) {
    const [storedHash, salt] = hashedPassword.split('.');
    const hash = (await this.scryptAsync(password, salt, 64)) as Buffer;
    return storedHash === hash.toString('hex');
  }
}