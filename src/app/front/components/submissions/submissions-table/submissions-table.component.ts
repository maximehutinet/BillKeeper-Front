import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BillsTableComponent} from "../../bills/bills-table/bills-table.component";
import {Button} from "primeng/button";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {Ripple} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {InsuranceSubmissionWithBills} from '../../../../services/billkeeper-ws/submission/model';
import {markAsPaidSubmissionButtonVisible, markAsReimbursedSubmissionButtonVisible} from '../../../../services/utils';
import {RouterLink} from '@angular/router';
import {ValueLoadingOrNsComponent} from '../../commun/value-loading-or-ns/value-loading-or-ns.component';
import {SubmissionTableRow} from './model';
import {MenuItem} from 'primeng/api';
import {Menu} from 'primeng/menu';

@Component({
  selector: 'app-submissions-table',
  imports: [
    BillsTableComponent,
    Button,
    DatePipe,
    Ripple,
    TableModule,
    CurrencyPipe,
    RouterLink,
    ValueLoadingOrNsComponent,
    Menu
  ],
  templateUrl: './submissions-table.component.html',
  styleUrl: './submissions-table.component.scss'
})
export class SubmissionsTableComponent {

  protected readonly markAsPaidSubmissionButtonVisible = markAsPaidSubmissionButtonVisible;
  protected readonly markAsReimbursedSubmissionButtonVisible = markAsReimbursedSubmissionButtonVisible;

  tableRows: SubmissionTableRow[] = [];

  @Input()
  set submissions(submissions: InsuranceSubmissionWithBills[]) {
    this.buildTableRows(submissions);
  }

  @Output()
  onMarkAsPaid: EventEmitter<InsuranceSubmissionWithBills> = new EventEmitter();

  @Output()
  onMarkAsReimbursed: EventEmitter<InsuranceSubmissionWithBills> = new EventEmitter();

  @Output()
  onDeleteSubmission: EventEmitter<InsuranceSubmissionWithBills> = new EventEmitter();

  private buildTableRows(submissions: InsuranceSubmissionWithBills[]) {
    this.tableRows = submissions.map(submission => {
      return {
        id: submission.id,
        submission: submission,
        menuItems: [{
          label: 'Actions',
          items: this.getMenuItems(submission)
        }]
      }
    });
  }

  private getMenuItems(submission: InsuranceSubmissionWithBills): MenuItem[] {
    let items: MenuItem[] = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        routerLink: '/submissions/' + submission.id + '/edit'
      }
    ];
    if (this.markAsPaidSubmissionButtonVisible(submission)) {
      items.push({
        label: 'Mark as paid',
        icon: 'pi pi-dollar',
        command: () => this.onMarkAsPaid.emit(submission)
      });
    }
    if (this.markAsReimbursedSubmissionButtonVisible(submission)) {
      items.push({
        label: 'Mark as reimbursed',
        icon: 'pi pi-check-circle',
        command: () => this.onMarkAsReimbursed.emit(submission)
      });
    }
    items.push({
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => this.onDeleteSubmission.emit(submission),
      styleClass: 'menu-warning'
    });
    return items;
  }

}
