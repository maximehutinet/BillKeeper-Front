import {provideKeycloak} from 'keycloak-angular';

export const provideKeycloakAngular = () => {
  // TODO: Hardcoded here while waiting for fix, issue opened: https://github.com/mauriciovigolo/keycloak-angular/issues/604
  return provideKeycloak({
    config: {
      url: "http://10.0.0.23:10493",
      realm: "billkeeper",
      clientId: "billkeeper-frontend"
    },
    initOptions: {
      onLoad: 'login-required',
      enableLogging: true
    }
  });
}
