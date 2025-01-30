import {Injectable} from '@angular/core';
import {HttpWsService} from '../http-ws.service';
import {Bill, BillStatus} from './model';
import {BillDocument} from '../document/model';

@Injectable({
  providedIn: 'root'
})
export class BillWsService {

  constructor(
    private httpWsService: HttpWsService
  ) { }

  async getAllBills(): Promise<Bill[]> {
    return this.httpWsService.get<Bill[]>("/bills");
  }

  async getBill(billId: string): Promise<Bill> {
    return this.httpWsService.get<Bill>(`/bills/${billId}`);
  }

  async createBill(bill: Bill): Promise<Bill> {
    return this.httpWsService.post<Bill>("/bills", bill);
  }

  async uploadBillDocument(billId: string, document: File, parseAndUpdateBill: boolean = false): Promise<void> {
    const formData = new FormData();
    formData.append("file", document);
    if (parseAndUpdateBill) {
      return this.httpWsService.post(`/bills/${billId}/documents?parse=true`, formData);
    }
    return this.httpWsService.post(`/bills/${billId}/documents`, formData);
  }

  async getBillDocuments(billId: string): Promise<BillDocument[]> {
    return this.httpWsService.get<BillDocument[]>(`/bills/${billId}/documents`);
  }

  async markBillAsReimbursed(billId: string): Promise<void> {
    const requestBody: Bill = {
      status: BillStatus.REIMBURSED
    }
    return this.httpWsService.post(`/bills/${billId}`, requestBody);
  }

  async markBillAsPaid(billId: string): Promise<void> {
    const requestBody: Bill = {
      paidDateTime: new Date()
    }
    return this.httpWsService.post(`/bills/${billId}`, requestBody);
  }

  async deleteBill(billId: string): Promise<void> {
    return this.httpWsService.delete(`/bills/${billId}`);
  }
}
