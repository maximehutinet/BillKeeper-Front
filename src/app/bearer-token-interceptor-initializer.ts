import {INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG} from 'keycloak-angular';
import {loadEnvironment} from './services/utils';

export const provideBearerTokenInterceptor = () => {
  let { serverUrl } = loadEnvironment();
  const urlRegex = escapeUrlToRegex(serverUrl)
  return {
    provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
    useValue: [
      {
        urlPattern: urlRegex
      }
    ]
  }

  function escapeUrlToRegex(url: string): RegExp {
    const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(`^${escaped}/.*$`);
  }
}
