import { Controller, Get } from '@nestjs/common';
import {
  AuthenticatedUser,
  Public,
  Roles,
  Unprotected,
} from 'nest-keycloak-connect';
import { UserService } from '../Service/User';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/public')
  @Public()
  getpublic(): string {
    return `${this.userService.getHello()} from public`;
  }

  @Get('/user')
  @Roles({ roles: ['user'] })
  // @Roles('realm:app-user') // protected using realm role
  getUser(): string {
    return `${this.userService.getHello()} from user`;
  }

  @Get('/admin')
  @Roles({ roles: ['realm:Administrator'] })
  getAdmin(): string {
    return `${this.userService.getHello()} from admin`;
  }

  @Get('/all')
  @Roles({ roles: ['user', 'realm:Administrator', 'realm:Developer'] })
  getAll(@AuthenticatedUser() user: any): string {
    console.log(user);
    return `${this.userService.getHello()} from all`;
  }

  //////////////////////////////

  @Get('/token')
  @Public()
  async enerateToken(): Promise<any> {
    const data = await this.userService.getToken();
    return data;
  }

  @Get('/')
  @Unprotected()
  default(): string {
    return 'Default';
  }
}
