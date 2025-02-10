import {Component} from '@angular/core';
import {SubmissionWsService} from '../../../services/billkeeper-ws/submission/submission-ws.service';
import {LayoutService} from '../../../services/layout.service';
import {InsuranceSubmissionWithBills} from '../../../services/billkeeper-ws/submission/model';
import {MainLayoutComponent} from '../../layouts/main-layout/main-layout.component';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {DatePipe} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {BillStatus} from '../../../services/billkeeper-ws/bill/model';
import {BillsTableComponent} from '../../components/bills-table/bills-table.component';

@Component({
  selector: 'app-submissions-page',
  imports: [
    MainLayoutComponent,
    TableModule,
    Button,
    Ripple,
    DatePipe,
    Tooltip,
    BillsTableComponent
  ],
  templateUrl: './submissions-page.component.html',
  styleUrl: './submissions-page.component.scss'
})
export class SubmissionsPageComponent {

  protected readonly BillStatus = BillStatus;

  submissions: InsuranceSubmissionWithBills[] = [];

  constructor(
    private submissionWsService: SubmissionWsService,
    private layoutService: LayoutService,
  ) {
  }

  async ngOnInit() {
    await this.layoutService.withPageLoading(async () => {
      this.submissions = await this.submissionWsService.getAllSubmissions();
      console.log(this.submissions)
    });
  }
}
