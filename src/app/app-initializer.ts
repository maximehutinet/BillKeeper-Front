import {inject, provideAppInitializer} from '@angular/core';
import {ConfigurationService} from './services/configuration.service';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {Configuration} from './services/model/configuration';

export const provideInitializer = () => {
  return provideAppInitializer(async () => {
      const configurationService = inject(ConfigurationService);
      const httpBackend = inject(HttpBackend);
      const httpClient: HttpClient = new HttpClient(httpBackend);
      const response = await lastValueFrom(httpClient.get('/assets/configuration.json?time=' + Date.now()));
      configurationService.configuration = response as Configuration;
    }
  )
}
