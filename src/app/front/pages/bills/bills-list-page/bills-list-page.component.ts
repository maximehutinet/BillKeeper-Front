import { Component } from '@angular/core';
import {BillsFilterComponent} from "../../../components/bills/bills-filter/bills-filter.component";
import {BillsTableComponent} from "../../../components/bills/bills-table/bills-table.component";
import {Button} from "primeng/button";
import {EditNameDialogComponent} from "../../../components/commun/edit-name-dialog/edit-name-dialog.component";
import {MainLayoutComponent} from "../../../layouts/main-layout/main-layout.component";
import {NgIf} from "@angular/common";
import {Bill, BillStatus} from '../../../../services/billkeeper-ws/bill/model';
import {BillWsService} from '../../../../services/billkeeper-ws/bill/bill-ws.service';
import {DocumentWsService} from '../../../../services/billkeeper-ws/document/document-ws.service';
import {SubmissionWsService} from '../../../../services/billkeeper-ws/submission/submission-ws.service';
import {LayoutService} from '../../../../services/layout.service';
import {MessageType, ToastMessageService} from '../../../../services/toast-message.service';
import {Router} from '@angular/router';
import {CreateUpdateInsuranceSubmissionRequest} from '../../../../services/billkeeper-ws/submission/model';
import {Subject} from 'rxjs';
import {TopBarComponent} from '../../../components/layout/top-bar/top-bar.component';

@Component({
  selector: 'app-bills-list-page',
  imports: [
    BillsFilterComponent,
    BillsTableComponent,
    Button,
    EditNameDialogComponent,
    MainLayoutComponent,
    NgIf,
    TopBarComponent
  ],
  templateUrl: './bills-list-page.component.html',
  styleUrl: './bills-list-page.component.scss'
})
export class BillsListPageComponent {

  bills: Bill[] = [];
  selectedBills: Bill[] = [];
  filteredBills: Bill[] = [];
  showSubmissionNameDialog = false;
  newSubmissionName = "";
  createNewSubmissionButtonVisible = false;
  resetFiltersSubject: Subject<void> = new Subject<void>();

  constructor(
    private billWsService: BillWsService,
    private documentWsService: DocumentWsService,
    private submissionWsService: SubmissionWsService,
    private layoutService: LayoutService,
    private toastMessageService: ToastMessageService,
    private router: Router
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
      this.filteredBills = this.bills;
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
      this.resetFiltersSubject.next();
      await this.loadAllBills();
    });
  }

  private async uploadBills(files: FileList) {
    for (const file of Array.from(files)) {
      const bill: Bill = await this.createNewBill();
      await this.uploadBill(bill, file);
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

  private async uploadBill(bill: Bill, file: File) {
    try {
      if (!bill.id) {
        return;
      }
      await this.billWsService.uploadBillDocument(bill.id, file as File, true);
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  public async downloadMergedBillsDocuments() {
    try {
      await this.layoutService.withPageLoading(async () => {
        const billIds: string[] = this.selectedBills
          .map(bill => bill.id)
          .filter(id => id != undefined);
        await this.documentWsService.getMergedBillsDocuments(billIds);
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  onSelectedBillChange() {
    if (this.selectedBills.length === 0) {
      this.createNewSubmissionButtonVisible = false;
      return;
    }
    this.createNewSubmissionButtonVisible = this.selectedBills
      .filter((bill) => bill.status !== BillStatus.TO_FILE)
      .length === 0;
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
      await this.billWsService.markBillAsReimbursed(bill);
      await this.loadAllBills();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async createNewSubmission() {
    try {
      if (this.newSubmissionName.length === 0) {
        this.toastMessageService.displayMessage("The submission name can't be empty", MessageType.Error, "Error");
        return;
      }
      const request: CreateUpdateInsuranceSubmissionRequest = {
        name: this.newSubmissionName,
        billIds: this.selectedBills.map(b => b.id!)
      };
      await this.submissionWsService.createSubmission(request);
      await this.router.navigate(["submissions"]);
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onValidateNewSubmissionName(name: string) {
    this.newSubmissionName = name;
    this.showSubmissionNameDialog = false;
    await this.createNewSubmission();
  }

  onBillFilterChange(bills: Bill[]) {
    this.filteredBills = bills;
  }
}
