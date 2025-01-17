import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {ConfigurationService} from '../configuration.service';

@Injectable({
  providedIn: 'root'
})
export class HttpWsService {

  constructor(
    private configurationService: ConfigurationService,
    private httpClient: HttpClient
  ) { }

  async get<T>(path: string, params?: HttpParams | { [param: string]: string | string[] }): Promise<any> {
    try {
      const headers = await this.builderHeaders();
      return await lastValueFrom(this.httpClient.get<T>(this.url(path), {headers: headers, params: params}));
    } catch (error) {
      await this.handleError(error);
    }
  }

  async post<T>(path: string, body: any, params?: HttpParams | { [param: string]: string | string[] }): Promise<any> {
    try {
      const headers = await this.builderHeaders();
      return await lastValueFrom(this.httpClient.post<T>(this.url(path), body, {headers: headers, params: params}));
    } catch (error) {
      await this.handleError(error);
    }
  }

  async delete<T>(path: string, params?: HttpParams | { [param: string]: string | string[] }): Promise<any> {
    try {
      const headers = await this.builderHeaders();
      return await lastValueFrom(this.httpClient.delete<T>(this.url(path), {headers: headers, params: params}));
    } catch (error) {
      await this.handleError(error);
    }
  }

  private async builderHeaders(): Promise<HttpHeaders> {
    return new HttpHeaders();
  }

  private url(path: string) {
    return this.configurationService.configuration.serverUrl + path;
  }

  private async handleError(error: any) {
    let errorHandled = false;
    if (!errorHandled) {
      throw error;
    }
  }
}
