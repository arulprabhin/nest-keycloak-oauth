import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  ResourceGuard,
  RoleGuard,
  TokenValidation,
} from 'nest-keycloak-connect';
import { UserController } from '../Controller/User';
import { UserService } from '../Service/User';

@Module({
  imports: [
    CacheModule.register(),
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '_settings.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      isGlobal: true,
    }),
    KeycloakConnectModule.register({
      authServerUrl: 'http://10.4.0.22:9090',
      realm: 'wellspring-ai-realm',
      clientId: 'admin-cli',
      secret: 'lrsHenCXp52x2TpwwZ51lvGB3Ph60R3u',
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'test102',
      entities: [],
      retryAttempts: 20,
      retryDelay: 5000,
      autoLoadEntities: false,
      synchronize: process.env.NODE_ENV !== 'production',
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