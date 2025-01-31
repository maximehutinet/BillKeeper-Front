import {Component} from '@angular/core';
import {Bill, BillStatus} from '../../../services/billkeeper-ws/bill/model';
import {BillWsService} from '../../../services/billkeeper-ws/bill/bill-ws.service';
import {TableModule} from 'primeng/table';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {billStatusBadge, billStatusToString} from '../../../services/utils';
import {MainLayoutComponent} from '../../layouts/main-layout/main-layout.component';
import {CurrencyPipe} from '../../../services/pipes/currency.pipe';
import {Checkbox, CheckboxChangeEvent} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {DocumentWsService} from '../../../services/billkeeper-ws/document/document-ws.service';
import {Badge} from 'primeng/badge';
import {Tooltip} from 'primeng/tooltip';
import {RouterLink} from '@angular/router';
import {LayoutService} from '../../../services/layout.service';
import {ToastMessageService} from '../../../services/toast-message.service';

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
    NgIf,
    Badge,
    Tooltip,
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  protected readonly billStatusToString = billStatusToString;
  protected readonly billStatusBadge = billStatusBadge;
  protected readonly BillStatus = BillStatus;

  bills: Bill[] = [];
  billsToMerge: Bill[] = [];

  constructor(
    private billWsService: BillWsService,
    private documentWsService: DocumentWsService,
    private layoutService: LayoutService,
    private toastMessageService: ToastMessageService
  ) {
  }

  async ngOnInit() {
    await this.layoutService.withPageLoading(async () => {
      await this.loadAllBills();
    });
  }

  async loadAllBills() {
    try {
      this.bills = await this.billWsService.getAllBills();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onUpload(event: any) {
    await this.layoutService.withPageLoading(async () => {
      if (!event.target.files && !event.target.files[0]) {
        return;
      }
      await this.uploadBills(event.target.files);
    });
  }

  private async uploadBills(files: FileList) {
    for (const file of Array.from(files)) {
      const newBill: Bill = await this.createNewBill();
      if (newBill.id) {
        await this.billWsService.uploadBillDocument(newBill.id, file as File, true);
        this.bills = await this.billWsService.getAllBills();
      }
    }
  }

  private async createNewBill(): Promise<Bill> {
    try {
      return await this.billWsService.createBill({});
    } catch (e) {
      this.toastMessageService.displayError(e);
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
      await this.layoutService.withPageLoading(async () => {
        const billIds: string[] = this.billsToMerge
          .map(bill => bill.id)
          .filter(id => id != undefined);
        await this.documentWsService.getMergedBillsDocuments(billIds);
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onMarkAsPaid(bill: Bill) {
    try {
      await this.billWsService.markBillAsPaid(bill.id!);
      await this.loadAllBills();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onMarkAsReimbursed(bill: Bill) {
    try {
      await this.billWsService.markBillAsReimbursed(bill.id!);
      await this.loadAllBills();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

}
