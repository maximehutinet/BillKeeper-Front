import {Component} from '@angular/core';
import {MainLayoutComponent} from "../../../layouts/main-layout/main-layout.component";
import {TableModule} from "primeng/table";
import {InsuranceSubmissionWithBills} from '../../../../services/billkeeper-ws/submission/model';
import {SubmissionWsService} from '../../../../services/billkeeper-ws/submission/submission-ws.service';
import {LayoutService} from '../../../../services/layout.service';
import {BillStatus} from '../../../../services/billkeeper-ws/bill/model';
import {SubmissionsTableComponent} from '../../../components/submissions/submissions-table/submissions-table.component';

@Component({
  selector: 'app-submissions-list-page',
  imports: [
    MainLayoutComponent,
    TableModule,
    SubmissionsTableComponent
  ],
  templateUrl: './submissions-list-page.component.html',
  styleUrl: './submissions-list-page.component.scss'
})
export class SubmissionsListPageComponent {

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
    });
  }
}
