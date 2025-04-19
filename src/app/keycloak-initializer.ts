import {provideKeycloak} from 'keycloak-angular';
import {loadEnvironment} from './services/utils';

export const provideKeycloakAngular = () => {
  const { keycloakUrl, keycloakRealm, keycloakClientId } = loadEnvironment();
  return provideKeycloak({
    config: {
      url: keycloakUrl,
      realm: keycloakRealm,
      clientId: keycloakClientId
    },
    initOptions: {
      onLoad: 'login-required',
      enableLogging: false
    }
  });
}
