import { Module } from '@nestjs/common';
import { UserController } from '../Controller/User';
import { UserService } from '../Service/User';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    KeycloakConnectModule.register({
      authServerUrl: 'http://10.4.0.22:9090',
      realm: 'wellspring-ai-realm',
      clientId: 'admin-cli',
      secret: 'lrsHenCXp52x2TpwwZ51lvGB3Ph60R3u',
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
