import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(name: string, email: string, password: string): Promise<UserDocument> {
    const user = new this.userModel({
      email,
      password,
      name,
    });

    return user.save(); 
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    if (!id) {
      throw new NotFoundException('User not found');
    }
    return this.userModel.findById(id);
  }
}
