import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {
    if(createUserDto.cpf == "" || createUserDto.name == ""){
      return{
        statusCode: 400,
        body: "Invalid parameters"
      }
    }
    
    try {
      const alreadyExists = await this.userModel.findOne({ cpf: createUserDto.cpf }).exec();
      if (alreadyExists) {
        return{
          statusCode: 409,
          body: "User already registered."
        }
      } else {
        const user = new this.userModel(createUserDto);
        user.cpf = await this.cpfFormatter(createUserDto.cpf)
        user.balance = 0;
        user.save();
        return{
          statusCode: 201,
          body: user
        }
      }
    } catch (e) {
      return {
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find();
      return{
        statusCode: 200,
        body: users
      }
    } catch (e) {
      return{
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id);
      return{
        statusCode: 200,
        body: user
      }
    } catch (e) {
      return{
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.userModel.findByIdAndUpdate({
        _id: id
      },
        {
          $set: updateUserDto
        },
        {
          new: true
        });
      return{
        statusCode: 200,
        body: "User successfully updated"
      }
    } catch (e) {
      return {
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }

  }

  async remove(id: string) {
    try {
      const deleted = await this.userModel.deleteOne({
        _id: id
      }).exec();
      return{
        statusCode: 200,
        body: deleted
      }
    } catch (e) {
      return {
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }

  async cpfFormatter(cpf: string) {
    let newFormat = cpf.replace(/\.|-/g, '');
    return newFormat
  }
}
