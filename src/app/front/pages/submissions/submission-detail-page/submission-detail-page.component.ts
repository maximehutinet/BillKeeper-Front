import { Component } from '@angular/core';
import {BillsTableComponent} from "../../../components/bills/bills-table/bills-table.component";
import {DatePipe} from "@angular/common";
import {Fieldset} from "primeng/fieldset";
import {MainLayoutComponent} from "../../../layouts/main-layout/main-layout.component";
import {InsuranceSubmissionWithBills} from '../../../../services/billkeeper-ws/submission/model';
import {SubmissionWsService} from '../../../../services/billkeeper-ws/submission/submission-ws.service';
import {ActivatedRoute} from '@angular/router';
import {LayoutService} from '../../../../services/layout.service';
import {ToastMessageService} from '../../../../services/toast-message.service';

@Component({
  selector: 'app-submission-detail-page',
    imports: [
        BillsTableComponent,
        DatePipe,
        Fieldset,
        MainLayoutComponent
    ],
  templateUrl: './submission-detail-page.component.html',
  styleUrl: './submission-detail-page.component.scss'
})
export class SubmissionDetailPageComponent {

  submission: InsuranceSubmissionWithBills = {
    bills: []
  };

  constructor(
    private submissionWsService: SubmissionWsService,
    private activatedRoute: ActivatedRoute,
    private layoutService: LayoutService,
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
}
