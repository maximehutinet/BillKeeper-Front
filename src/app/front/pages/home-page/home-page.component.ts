import {Component} from '@angular/core';
import {Bill, BillStatus} from '../../../services/billkeeper-ws/bill/model';
import {BillWsService} from '../../../services/billkeeper-ws/bill/bill-ws.service';
import {TableModule} from 'primeng/table';
import {NgIf} from '@angular/common';
import {MainLayoutComponent} from '../../layouts/main-layout/main-layout.component';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {DocumentWsService} from '../../../services/billkeeper-ws/document/document-ws.service';
import {Router} from '@angular/router';
import {LayoutService} from '../../../services/layout.service';
import {MessageType, ToastMessageService} from '../../../services/toast-message.service';
import {SubmissionWsService} from '../../../services/billkeeper-ws/submission/submission-ws.service';
import {EditNameDialogComponent} from '../../components/edit-name-dialog/edit-name-dialog.component';
import {CreateUpdateInsuranceSubmissionRequest} from '../../../services/billkeeper-ws/submission/model';
import {BillsTableComponent} from '../../components/bills-table/bills-table.component';

@Component({
  selector: 'app-home-page',
  imports: [
    TableModule,
    MainLayoutComponent,
    FormsModule,
    Button,
    NgIf,
    EditNameDialogComponent,
    BillsTableComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  bills: Bill[] = [];
  selectedBills: Bill[] = [];
  showSubmissionNameDialog = false;
  newSubmissionName = "";
  createNewSubmissionButtonVisible = false;

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
    const selectedBillsCanBeInNewSubmission = this.selectedBills
      .filter((bill) => bill.status !== BillStatus.TO_FILE)
      .length === 0;
    if (selectedBillsCanBeInNewSubmission) {
      this.createNewSubmissionButtonVisible = true;
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

}
