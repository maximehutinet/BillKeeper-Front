import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Button} from "primeng/button";
import {Checkbox, CheckboxChangeEvent} from "primeng/checkbox";
import {CurrencyPipe} from "../../../services/pipes/currency.pipe";
import {DatePipe, NgIf} from "@angular/common";
import {TableModule} from "primeng/table";
import {Tooltip} from "primeng/tooltip";
import {Bill, BillStatus} from "../../../services/billkeeper-ws/bill/model";
import {RouterLink} from '@angular/router';
import {BillStatusBadgeComponent} from '../bill-status-badge/bill-status-badge.component';

@Component({
  selector: 'app-bills-table',
  imports: [
    Button,
    Checkbox,
    CurrencyPipe,
    DatePipe,
    NgIf,
    TableModule,
    Tooltip,
    RouterLink,
    BillStatusBadgeComponent
  ],
  templateUrl: './bills-table.component.html',
  styleUrl: './bills-table.component.scss'
})
export class BillsTableComponent {

    protected readonly BillStatus = BillStatus;

    @Input()
    bills: Bill[] = [];

    @Input()
    makeBillSelectable = false;

    @Input()
    selectedBills: Bill[] = [];

    @Output()
    selectedBillsChange: EventEmitter<Bill[]> = new EventEmitter();

    @Input()
    displayMarkAsPaidButton = false;

    @Output()
    onMarkBillAsPaid: EventEmitter<Bill> = new EventEmitter();

    @Input()
    displayMarkAsReimbursedButton = false;

    @Output()
    onMarkBillAsReimbursed: EventEmitter<Bill> = new EventEmitter();


  public onCheckboxChange(event: CheckboxChangeEvent, bill: Bill) {
    if (event.checked) {
      this.selectedBills.push(bill);
    } else {
      this.selectedBills = this.selectedBills.filter(b => b != bill);
    }
    this.selectedBillsChange.emit(this.selectedBills);
  }

}
