import {Component} from '@angular/core';
import {MainLayoutComponent} from "../../../layouts/main-layout/main-layout.component";
import {TableModule} from "primeng/table";
import {
  CreateUpdateInsuranceSubmissionRequest,
  InsuranceSubmissionWithBills
} from '../../../../services/billkeeper-ws/submission/model';
import {SubmissionWsService} from '../../../../services/billkeeper-ws/submission/submission-ws.service';
import {LayoutService} from '../../../../services/layout.service';
import {BillStatus} from '../../../../services/billkeeper-ws/bill/model';
import {SubmissionsTableComponent} from '../../../components/submissions/submissions-table/submissions-table.component';
import {ToastMessageService} from '../../../../services/toast-message.service';
import {BillWsService} from '../../../../services/billkeeper-ws/bill/bill-ws.service';
import {EditNameDialogComponent} from '../../../components/commun/edit-name-dialog/edit-name-dialog.component';
import {ValidationService} from '../../../../services/validation.service';

@Component({
  selector: 'app-submissions-list-page',
  imports: [
    MainLayoutComponent,
    TableModule,
    SubmissionsTableComponent,
    EditNameDialogComponent
  ],
  templateUrl: './submissions-list-page.component.html',
  styleUrl: './submissions-list-page.component.scss'
})
export class SubmissionsListPageComponent {

  protected readonly BillStatus = BillStatus;

  submissions: InsuranceSubmissionWithBills[] = [];
  editSubmissionNameDialogVisible = false;
  editedSubmission: InsuranceSubmissionWithBills = { bills: [] };


  constructor(
    private submissionWsService: SubmissionWsService,
    private billWsService: BillWsService,
    private layoutService: LayoutService,
    private toastMessageService: ToastMessageService,
    private validationService: ValidationService
  ) {
  }

  async ngOnInit() {
    await this.loadSubmissions();
  }

  private async loadSubmissions() {
    try {
      await this.layoutService.withPageLoading(async () => {
        this.submissions = await this.submissionWsService.getAllSubmissions();
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onMarkSubmissionAsPaid(submission: InsuranceSubmissionWithBills) {
    try {
      for (const bill of submission.bills) {
        await this.billWsService.markBillAsPaid(bill.id!)
      }
      await this.loadSubmissions();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onMarkSubmissionAsReimbursed(submission: InsuranceSubmissionWithBills) {
    try {
      for (const bill of submission.bills) {
        await this.billWsService.markBillAsReimbursed(bill)
      }
      await this.loadSubmissions();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  onEditSubmissionName(submission: InsuranceSubmissionWithBills) {
    this.editedSubmission = submission;
    this.editSubmissionNameDialogVisible = true;
  }

  async onValidateSubmissionNameEdit(name: string) {
    try {
      this.editSubmissionNameDialogVisible = false;
      const request: CreateUpdateInsuranceSubmissionRequest = {
        name: name
      }
      await this.submissionWsService.updateSubmission(this.editedSubmission.id!, request);
      await this.loadSubmissions();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onDeleteSubmission(submission: InsuranceSubmissionWithBills) {
    try {
      this.validationService.showConfirmationDialog(async () => {
        await this.submissionWsService.deleteSubmission(submission.id!);
        await this.loadSubmissions();
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }
}
