import {Component} from '@angular/core';
import {Bill} from '../../../services/billkeeper-ws/bill/model';
import {BillWsService} from '../../../services/billkeeper-ws/bill/bill-ws.service';
import {TableModule} from 'primeng/table';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {billStatusToString} from '../../../services/utils';
import {MainLayoutComponent} from '../../layouts/main-layout/main-layout.component';
import {CurrencyPipe} from '../../../services/pipes/currency.pipe';
import {Checkbox, CheckboxChangeEvent} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {DocumentWsService} from '../../../services/billkeeper-ws/document/document-ws.service';

@Component({
  selector: 'app-home-page',
  imports: [
    TableModule,
    DatePipe,
    MainLayoutComponent,
    CurrencyPipe,
    NgClass,
    Checkbox,
    FormsModule,
    Button,
    NgIf
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  protected readonly billStatusToString = billStatusToString;

  bills: Bill[] = [];
  pageLoading = false;
  billsToMerge: Bill[] = [];

  constructor(
    private billWsService: BillWsService,
    private documentWsService: DocumentWsService
  ) {
  }

  async ngOnInit() {
    try {
      this.bills = await this.billWsService.getAllBills();
    } catch (e) {
      console.log(e)
    }
  }

  async onUpload(event: any) {
    this.pageLoading = true;
    if (!event.target.files && !event.target.files[0]) {
      return;
    }
    await this.uploadBills(event.target.files);
    this.pageLoading = false;
  }

  private async uploadBills(files: FileList) {
    for (const file of Array.from(files)) {
      const newBill: Bill = await this.createNewBill();
      if (newBill.id) {
        await this.billWsService.uploadBillDocument(newBill.id, file as File);
        this.bills = await this.billWsService.getAllBills();
      }
    }
  }

  private async createNewBill(): Promise<Bill> {
    try {
      return await this.billWsService.createBill({ });
    } catch (e) {
      console.log(e);
      return {}
    }
  }

  public onCheckboxChange(event: CheckboxChangeEvent, bill: Bill) {
    if (event.checked) {
      this.billsToMerge.push(bill);
    } else {
      this.billsToMerge = this.billsToMerge.filter(b => b != bill);
    }
  }

  public async downloadMergedBillsDocuments() {
    try {
      this.pageLoading = true;
      const billIds: string[] = this.billsToMerge
        .map(bill => bill.id)
        .filter(id => id != undefined);
      await this.documentWsService.getMergedBillsDocuments(billIds);
      this.pageLoading = false;
    } catch (e) {
      console.log(e);
    }
  }
}
