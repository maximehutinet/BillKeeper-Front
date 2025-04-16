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
      for (const file of Array.from(event.target.files)) {
        await this.createNewBill(<File>file);
      }
    });
  }

  private async createNewBill(file: File): Promise<void> {
    try {
      await this.billWsService.createBill(file);
      this.resetFiltersSubject.next();
      await this.loadAllBills();
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
      await this.billWsService.markBillAsPaid(bill);
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

  async onDrop(event: any) {
    this.layoutService.pageFocusing = false;
    await this.layoutService.withPageLoading(async () => {
      if (event.dataTransfer.items) {
        for (const item of [...event.dataTransfer.items]) {
          if (item.kind === "file") {
            const file = item.getAsFile();
            const fileExtension = file.name.split(".").pop();
            if (fileExtension != "pdf") {
              this.toastMessageService.displayMessage(`${file.name} couldn't be uploaded because it's not a PDF`, MessageType.Error, "File error");
              return;
            }
            await this.createNewBill(<File>file);
          }
        }
      }
    });
  }

  onDragOver() {
    this.layoutService.pageFocusing = true;
  }

  onDragLeave() {
    this.layoutService.pageFocusing = false;
  }
}
