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

  async getAllBills(): Promise<Bill[]> {
    return this.httpWsService.get<Bill>("/bills");
  }

  async createBill(bill: Bill): Promise<Bill> {
    return this.httpWsService.post<Bill>("/bills", bill);
  }

  async uploadBillDocument(billId: string, document: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", document);
    return this.httpWsService.post(`/bills/${billId}/document`, formData);
  }
}
