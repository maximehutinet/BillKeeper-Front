import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura'
import {ConfigurationService} from './services/configuration.service';
import {HttpBackend, HttpClient, provideHttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {Configuration} from './services/model/configuration';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAppInitializer(async () => {
        const configurationService = inject(ConfigurationService);
        const httpBackend = inject(HttpBackend);
        const httpClient: HttpClient = new HttpClient(httpBackend);
        const response = await lastValueFrom(httpClient.get('/assets/configuration.json?time=' + Date.now()));
        configurationService.configuration = response as Configuration;
      }
    ),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
