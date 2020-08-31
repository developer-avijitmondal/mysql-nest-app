import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpStatus,
  } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersDTO } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async showAllUsers() {
      return {
        statusCode: HttpStatus.OK,
        data: await this.usersService.showAll(),
      };
    }
  
    @Post()
    async createUsers(@Body() data: UsersDTO) {
      return {
        statusCode: HttpStatus.OK,
        message: 'User added successfully',
        data: await this.usersService.create(data),
      };
    }
  
    @Get(':id')
    async readUser(@Param('id') id: number) {
      return {
        statusCode: HttpStatus.OK,
        data: await this.usersService.read(id),
      };
    }
  
    @Patch(':id')
    async uppdateUser(@Param('id') id: number, @Body() data: UsersDTO) {
    //async uppdateUser(@Param('id') id: number, @Body() data: UsersDTO): Promise<UsersDTO> {

      //   return {
      //   statusCode: HttpStatus.OK,
      //   message: 'User update successfully',
      //   data: await this.usersService.update(id, data),
      // };
      // return await this.usersService.update(id, data)
      return { 
        statusCode: HttpStatus.OK,
        message: 'User update successfully',
        data: await this.usersService.update(id, data)
      }

    }

    // @Put('user')
    // async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
    //   return await this.userService.update(userId, userData);
    // }
  
    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
      await this.usersService.destroy(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    }
  
}
