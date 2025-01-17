import { Injectable } from '@angular/core';
import {HttpWsService} from '../http-ws.service';
import {Bill} from './model';

@Injectable({
  providedIn: 'root'
})
export class BillWsService {

  constructor(
    private httpWsService: HttpWsService
  ) { }

  async getAllBills() {
    return this.httpWsService.get<Bill>("/bills");
  }
}
