import {Component} from '@angular/core';
import {MainLayoutComponent} from "../../../layouts/main-layout/main-layout.component";
import {TableModule} from "primeng/table";
import {InsuranceSubmissionWithBills} from '../../../../services/billkeeper-ws/submission/model';
import {SubmissionWsService} from '../../../../services/billkeeper-ws/submission/submission-ws.service';
import {LayoutService} from '../../../../services/layout.service';
import {BillStatus} from '../../../../services/billkeeper-ws/bill/model';
import {SubmissionsTableComponent} from '../../../components/submissions/submissions-table/submissions-table.component';
import {ToastMessageService} from '../../../../services/toast-message.service';
import {BillWsService} from '../../../../services/billkeeper-ws/bill/bill-ws.service';
import {ValidationService} from '../../../../services/validation.service';
import {TopBarComponent} from "../../../components/layout/top-bar/top-bar.component";

@Component({
  selector: 'app-submissions-list-page',
  imports: [
    MainLayoutComponent,
    TableModule,
    SubmissionsTableComponent,
    TopBarComponent
  ],
  templateUrl: './submissions-list-page.component.html',
  styleUrl: './submissions-list-page.component.scss'
})
export class SubmissionsListPageComponent {

  protected readonly BillStatus = BillStatus;

  submissions: InsuranceSubmissionWithBills[] = [];


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
        console.log(this.submissions)
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
