import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { jsonToQs } from '../Util/query';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    console.log(
      'HOST-> ' + this.configService.get<string>('DB_HOST', 'localhost'),
    );
    console.log('PORT-> ' + this.configService.get<number>('DB_PORT', 5432));
    return 'Hello';
  }

  async getToken(): Promise<any> {
    try {
      const reqData = {
        client_id: 'ws-ai-client',
        grant_type: 'password',
        username: 'api.tester',
        password: 'apiTester@1',
      };
      const response = await axios.post(
        'http://10.4.0.22:9090/realms/wellspring-ai-realm/protocol/openid-connect/token',
        jsonToQs(reqData),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return response.data;
    } catch (error) {
      // Handle errors
      console.log(error);
      throw error;
    }
  }
}