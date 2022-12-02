import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({type: CreateUserDto})
  async create(@Body() createUserDto: CreateUserDto) {
    const payload =  await this.usersService.create(createUserDto);
    return payload
  }

  @Get()
   async findAll() {
    const payload = await this.usersService.findAll();
    return payload;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const payload = await this.usersService.findOne(id);
    return payload
  }

  @Patch(':id')
  @ApiBody({type: CreateUserDto})
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const payload = await this.usersService.update(id, updateUserDto);
    return payload
  }

  @Delete(':id')
  async remove(@Param('id') id: any) {
    const payload = await this.usersService.remove(id);
    return payload
  }
}
