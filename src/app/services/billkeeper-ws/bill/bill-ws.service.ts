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

  async createBill(file: File): Promise<Bill> {
    const formData = new FormData();
    formData.append("file", file);
    return this.httpWsService.post("/bills", formData);
  }

  async uploadBillDocument(billId: string, document: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", document);
    return this.httpWsService.post(`/bills/${billId}/documents`, formData);
  }

  async getBillDocuments(billId: string): Promise<BillDocument[]> {
    return this.httpWsService.get<BillDocument[]>(`/bills/${billId}/documents`);
  }
  async updateBill(billId: string, updatedBill: Bill): Promise<void> {
    return this.httpWsService.post(`/bills/${billId}`, updatedBill);
  }

  async markBillAsReimbursed(bill: Bill): Promise<void> {
    const requestBody: Bill = {
      paidDateTime: bill.paidDateTime,
      status: BillStatus.REIMBURSED
    }
    return this.httpWsService.post(`/bills/${bill.id}`, requestBody);
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

  async getProvidersStartingWith(value: string) {
    return this.httpWsService.get<string[]>(`/bills/providers?value=${value}`)
  }
}
