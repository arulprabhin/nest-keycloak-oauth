import { isNumber } from '@nestjs/common/utils/shared.utils';
import KeycloakConnectModuleMock from 'nest-keycloak-connect/keycloak-connect.module.js';

class MockKeycloak {
  constructor(config) {}

  async init() {}

  protect() {
    return (req, res, next) => next();
  }

  register() {}
}

const mockDecorator = jest.fn(() => {
  return function decoratorMock(target, key, descriptor) {
    console.log(target, key, descriptor);
    if (!isNumber(descriptor)) descriptor.value = () => 'Mocked method called';
    return descriptor;
  };
});

class KeycloakConnectModuleMock1 {
  logger;

  static register(opts, config) {
    return {
      module: KeycloakConnectModuleMock,
    };
  }

  registerAsync(opts) {}

  createAsyncProviders() {}

  createAsyncOptionsProvider() {}
}

enum PolicyEnforcementModeMock {
  ENFORCING = 'enforcing',
  PERMISSIVE = 'permissive',
}

enum TokenValidationMock {
  ONLINE = 'online',
  OFFLINE = 'offline',
  NONE = 'none',
}

module.exports = {
  Keycloak: MockKeycloak,
  NestKeycloakAuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn().mockReturnValue(true),
  })),
  Public: mockDecorator,
  Unprotected: mockDecorator,
  Roles: mockDecorator,
  AuthenticatedUser: mockDecorator,
  KeycloakConnectModule: jest.fn().mockImplementation(() => ({
    register: jest.fn().mockReturnValue({ module: KeycloakConnectModuleMock }),
  })),
  PolicyEnforcementMode: PolicyEnforcementModeMock,
  TokenValidation: TokenValidationMock,
};