import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminAuthGuard, AuthGuard } from 'src/auth.guard';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ) {
    const user = await this.userService.register(email, password, role);
    return { message: 'User registered successfully', user };
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const token = await this.userService.login(email, password);
    return { message: 'Login successful', token };
  }

  @Get('protected')
  @UseGuards(AuthGuard)
  async protectedRoute() {
    return { message: 'This route is protected' };
  }

  @Get('admin')
  @UseGuards(AdminAuthGuard)
  async protectedRoute1() {
    return { message: 'This route is admin protected' };
  }
}
