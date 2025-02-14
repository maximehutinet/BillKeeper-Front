import { Component } from '@angular/core';
import {BillsTableComponent} from "../../../components/bills/bills-table/bills-table.component";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {Fieldset} from "primeng/fieldset";
import {MainLayoutComponent} from "../../../layouts/main-layout/main-layout.component";
import {
  CreateUpdateInsuranceSubmissionRequest,
  InsuranceSubmissionWithBills
} from '../../../../services/billkeeper-ws/submission/model';
import {SubmissionWsService} from '../../../../services/billkeeper-ws/submission/submission-ws.service';
import {ActivatedRoute} from '@angular/router';
import {LayoutService} from '../../../../services/layout.service';
import {ToastMessageService} from '../../../../services/toast-message.service';
import {getApproximateTotalDollarValue} from "../../../../services/utils";
import {Bill} from '../../../../services/billkeeper-ws/bill/model';
import {ValidationService} from '../../../../services/validation.service';

@Component({
  selector: 'app-submission-detail-page',
    imports: [
        BillsTableComponent,
        DatePipe,
        Fieldset,
        MainLayoutComponent,
        CurrencyPipe
    ],
  templateUrl: './submission-detail-page.component.html',
  styleUrl: './submission-detail-page.component.scss'
})
export class SubmissionDetailPageComponent {

  protected readonly getApproximateTotalDollarValue = getApproximateTotalDollarValue;

  submission: InsuranceSubmissionWithBills = {
    bills: []
  };

  constructor(
    private submissionWsService: SubmissionWsService,
    private activatedRoute: ActivatedRoute,
    private layoutService: LayoutService,
    private validationService: ValidationService,
    private toastMessageService: ToastMessageService

  ) {
  }

  async ngOnInit() {
    try {
      await this.layoutService.withPageLoading(async () => {
        const submissionId = await this.activatedRoute.snapshot.params['submissionId'];
        this.submission = await this.submissionWsService.getSubmission(submissionId);
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  onRemoveBillFromSubmission(bill: Bill) {
    try {
      this.validationService.showConfirmationDialog(async () => {
        const request: CreateUpdateInsuranceSubmissionRequest = {
          billIds: this.submission.bills
            .filter(b => b.id && b.id !== bill.id)
            .map(b => b.id!)
        }
        await this.submissionWsService.updateSubmission(this.submission.id!, request);
        this.submission = await this.submissionWsService.getSubmission(this.submission.id!);
      }, "Are you sure you want to remove bill from submission?");
    } catch (e) {
      this.toastMessageService.displayError(e);
    }

  }
}
