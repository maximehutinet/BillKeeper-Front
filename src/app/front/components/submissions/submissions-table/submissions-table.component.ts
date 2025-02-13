import {Component, Input} from '@angular/core';
import {BillsTableComponent} from "../../bills/bills-table/bills-table.component";
import {Button} from "primeng/button";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {Ripple} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {Tooltip} from "primeng/tooltip";
import {InsuranceSubmissionWithBills} from '../../../../services/billkeeper-ws/submission/model';
import {getApproximateTotalDollarValue} from '../../../../services/utils';

@Component({
  selector: 'app-submissions-table',
  imports: [
    BillsTableComponent,
    Button,
    DatePipe,
    Ripple,
    TableModule,
    Tooltip,
    CurrencyPipe
  ],
  templateUrl: './submissions-table.component.html',
  styleUrl: './submissions-table.component.scss'
})
export class SubmissionsTableComponent {

  @Input()
  submissions: InsuranceSubmissionWithBills[] = [];

  protected readonly getApproximateTotalDollarValue = getApproximateTotalDollarValue;
}
