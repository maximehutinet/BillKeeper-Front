import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Button} from "primeng/button";
import {Checkbox} from "primeng/checkbox";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {TableModule} from "primeng/table";
import {Tooltip} from "primeng/tooltip";
import {Bill, BillStatus, ParsingJobStatus} from "../../../../services/billkeeper-ws/bill/model";
import {RouterLink} from '@angular/router';
import {BillStatusBadgeComponent} from '../bill-status-badge/bill-status-badge.component';
import {FormsModule} from '@angular/forms';
import {BillTableRow} from './model';
import {ValueLoadingOrNsComponent} from '../../commun/value-loading-or-ns/value-loading-or-ns.component';

@Component({
  selector: 'app-bills-table',
  imports: [
    Button,
    Checkbox,
    DatePipe,
    NgIf,
    TableModule,
    Tooltip,
    RouterLink,
    BillStatusBadgeComponent,
    FormsModule,
    CurrencyPipe,
    ValueLoadingOrNsComponent
  ],
  templateUrl: './bills-table.component.html',
  styleUrl: './bills-table.component.scss'
})
export class BillsTableComponent {

  protected readonly BillStatus = BillStatus;
  protected readonly ParsingJobStatus = ParsingJobStatus;

  tableRows: BillTableRow[] = [];
  allRowsSelected = false;

  @Input()
  set bills(bills: Bill[]) {
    this.buildTableRows(bills);
  }

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

  @Input()
  displayDeleteButton = false;

  @Output()
  onDelete: EventEmitter<Bill> = new EventEmitter();

  private buildTableRows(bills: Bill[]) {
    this.tableRows = bills.map(bill => {
      return {
        checked: this.isBillSelected(bill),
        bill: bill
      }
    });
  }

  private isBillSelected(bill: Bill): boolean {
    return this.selectedBills.filter(b => b.id === bill.id).length > 0;
  }

  public onCheckboxChange() {
    this.selectedBills = this.tableRows
      .filter(row => row.checked)
      .map(row => row.bill);
    this.allRowsSelected = this.selectedBills.length > 0;
    this.selectedBillsChange.emit(this.selectedBills);
  }

  public onAllRowsSelected() {
    this.changeTableRowsCheckedStatus(this.allRowsSelected);
    this.onCheckboxChange();
  }

  private changeTableRowsCheckedStatus(checkedStatus: boolean) {
    this.tableRows = this.tableRows.map(row => {
      return {
        checked: checkedStatus,
        bill: row.bill
      }
    });
  }
}
