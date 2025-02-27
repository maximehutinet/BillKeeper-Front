import {Component} from '@angular/core';
import {MainLayoutComponent} from "../../../layouts/main-layout/main-layout.component";
import {TableModule} from "primeng/table";
import {InsuranceSubmissionWithBills} from '../../../../services/billkeeper-ws/submission/model';
import {SubmissionWsService} from '../../../../services/billkeeper-ws/submission/submission-ws.service';
import {LayoutService} from '../../../../services/layout.service';
import {SubmissionsTableComponent} from '../../../components/submissions/submissions-table/submissions-table.component';
import {ToastMessageService} from '../../../../services/toast-message.service';
import {BillWsService} from '../../../../services/billkeeper-ws/bill/bill-ws.service';
import {ValidationService} from '../../../../services/validation.service';
import {TopBarComponent} from "../../../components/layout/top-bar/top-bar.component";
import {FloatLabel} from 'primeng/floatlabel';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-submissions-list-page',
  imports: [
    MainLayoutComponent,
    TableModule,
    SubmissionsTableComponent,
    TopBarComponent,
    FloatLabel,
    IconField,
    InputIcon,
    InputText,
    FormsModule
  ],
  templateUrl: './submissions-list-page.component.html',
  styleUrl: './submissions-list-page.component.scss'
})
export class SubmissionsListPageComponent {

  submissions: InsuranceSubmissionWithBills[] = [];
  filteredSubmissions: InsuranceSubmissionWithBills[] = [];
  searchKeyword: string | undefined;


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
        this.searchKeyword = undefined;
        this.filteredSubmissions = this.submissions;
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  applySearchFilter() {
    if (!this.searchKeyword) {
      this.filteredSubmissions = this.submissions;
    }
    this.filteredSubmissions = this.submissions
      .filter(submission => submission.eclaimId?.includes(this.searchKeyword!) || submission.name?.includes(this.searchKeyword!));
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
