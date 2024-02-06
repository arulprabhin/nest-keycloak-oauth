import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { jsonToQs } from '../Util/query';

@Injectable()
export class UserService {
  getHello(): string {
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
