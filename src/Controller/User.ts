import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuthenticatedUser,
  Public,
  Roles,
  Unprotected,
} from 'nest-keycloak-connect';
import { UserService } from '../Service/User';

@Controller()
@UseInterceptors(CacheInterceptor)
@ApiTags('User APIs')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/public')
  @Public()
  @ApiOperation({
    summary: 'This is a public endpoint',
    description:
      'Public endpoint may be accessed without any' + ' authorization',
  })
  getpublic(): string {
    return `${this.userService.getHello()} from public`;
  }

  @Get('/user')
  @Roles({ roles: ['user'] })
  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: String,
    description: 'Json structure for user object',
  })
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
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: String,
  })
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