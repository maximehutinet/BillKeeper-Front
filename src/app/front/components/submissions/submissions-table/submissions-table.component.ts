import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BillsTableComponent} from "../../bills/bills-table/bills-table.component";
import {Button} from "primeng/button";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {Ripple} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {Tooltip} from "primeng/tooltip";
import {InsuranceSubmissionWithBills} from '../../../../services/billkeeper-ws/submission/model';
import {getApproximateTotalDollarValue} from '../../../../services/utils';
import {RouterLink} from '@angular/router';
import {BillStatus} from '../../../../services/billkeeper-ws/bill/model';

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

  protected readonly getApproximateTotalDollarValue = getApproximateTotalDollarValue;

  @Input()
  submissions: InsuranceSubmissionWithBills[] = [];

  @Output()
  onMarkAsPaid: EventEmitter<InsuranceSubmissionWithBills> = new EventEmitter();

  @Output()
  onMarkAsReimbursed: EventEmitter<InsuranceSubmissionWithBills> = new EventEmitter();

  @Output()
  onEditSubmission: EventEmitter<InsuranceSubmissionWithBills> = new EventEmitter();

  @Output()
  onDeleteSubmission: EventEmitter<InsuranceSubmissionWithBills> = new EventEmitter();


  markAsPaidButtonVisible(submission: InsuranceSubmissionWithBills): boolean {
    return submission.bills.filter(bill => !bill.paidDateTime).length === submission.bills.length;
  }

  markAsReimbursedButtonVisible(submission: InsuranceSubmissionWithBills): boolean {
    return submission.bills.filter(bill => bill.status !== BillStatus.REIMBURSED).length === submission.bills.length;
  }
}
