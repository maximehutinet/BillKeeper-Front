import {Component} from '@angular/core';
import {SubmissionWsService} from '../../../services/billkeeper-ws/submission/submission-ws.service';
import {MainLayoutComponent} from '../../layouts/main-layout/main-layout.component';
import {ActivatedRoute} from '@angular/router';
import {LayoutService} from '../../../services/layout.service';
import {InsuranceSubmissionWithBills} from '../../../services/billkeeper-ws/submission/model';
import {ToastMessageService} from '../../../services/toast-message.service';
import {DatePipe} from '@angular/common';
import {Fieldset} from 'primeng/fieldset';
import {BillsTableComponent} from '../../components/bills-table/bills-table.component';

@Component({
  selector: 'app-submission-page',
  imports: [
    MainLayoutComponent,
    DatePipe,
    Fieldset,
    BillsTableComponent
  ],
  templateUrl: './submission-page.component.html',
  styleUrl: './submission-page.component.scss'
})
export class SubmissionPageComponent {

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
