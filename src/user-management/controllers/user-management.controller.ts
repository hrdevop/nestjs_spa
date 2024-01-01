import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '../models/dto/cerate-user.dto';
import { UserService } from '../services/user.service';
import { UserHelperService } from '../services/user-helper.service';

@Controller('user')
export class UserController {
  constructor(
    private _userService: UserService,
    private _uHelperService: UserHelperService,
  ) {}

  @Get('auto-insert/:count')
  autoInsert(@Param('count') count: number) {
    return this._userService.insertFakeData(count);
  }

  @Post('add')
  addUser(@Body() userDto: CreateUserDto) {
    try {
      const entity = this._uHelperService.dtoToEntity(userDto);
      return this._userService.addUser(entity);
    } catch (error) {
      return error;
    }
  }

  @Get('/search')
  async searchUsers(
    @Query('q') q: string,
    @Query('age') age: number,
    @Query('city') city: string,
  ) {
    return this._userService.searchUsers(q, age, city);
  }
}
