import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BillsTableComponent} from "../../bills/bills-table/bills-table.component";
import {Button} from "primeng/button";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {Ripple} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {Tooltip} from "primeng/tooltip";
import {InsuranceSubmissionWithBills} from '../../../../services/billkeeper-ws/submission/model';
import {markAsPaidSubmissionButtonVisible, markAsReimbursedSubmissionButtonVisible} from '../../../../services/utils';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-submissions-table',
  imports: [
    BillsTableComponent,
    Button,
    DatePipe,
    Ripple,
    TableModule,
    Tooltip,
    CurrencyPipe,
    RouterLink,
    NgIf
  ],
  templateUrl: './submissions-table.component.html',
  styleUrl: './submissions-table.component.scss'
})
export class SubmissionsTableComponent {

  protected readonly markAsPaidSubmissionButtonVisible = markAsPaidSubmissionButtonVisible;
  protected readonly markAsReimbursedSubmissionButtonVisible = markAsReimbursedSubmissionButtonVisible;

  @Input()
  submissions: InsuranceSubmissionWithBills[] = [];

  @Output()
  onMarkAsPaid: EventEmitter<InsuranceSubmissionWithBills> = new EventEmitter();

  @Output()
  onMarkAsReimbursed: EventEmitter<InsuranceSubmissionWithBills> = new EventEmitter();

  @Output()
  onDeleteSubmission: EventEmitter<InsuranceSubmissionWithBills> = new EventEmitter();


}
