import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import PrimeNgPreset from '../theme/primeng-preset'
import {provideHttpClient, withInterceptors} from '@angular/common/http';

import {ConfirmationService, MessageService} from 'primeng/api';
import {provideInitializer} from './app-initializer';
import {provideKeycloakAngular} from './keycloak-initializer';
import {INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, includeBearerTokenInterceptor} from 'keycloak-angular';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [
        {
          //TODO: Updating regex
          urlPattern: /^http:\/\/10\.0\.0\.23:8080\/.*$/,
        }
      ]
    },
    provideKeycloakAngular(),
    provideInitializer(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: PrimeNgPreset
      }
    }),
    ConfirmationService,
    MessageService
  ]
};
