import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dialog} from "primeng/dialog";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {BillStatusBadgeComponent} from '../../bills/bill-status-badge/bill-status-badge.component';
import {CurrencyPipe, DatePipe, NgIf} from '@angular/common';
import {TableModule} from 'primeng/table';
import {Bill} from '../../../../services/billkeeper-ws/bill/model';
import {RadioButton} from 'primeng/radiobutton';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-link-document-to-bill-dialog',
  imports: [
    Dialog,
    PdfViewerModule,
    BillStatusBadgeComponent,
    CurrencyPipe,
    DatePipe,
    NgIf,
    TableModule,
    RadioButton,
    FormsModule,
    Button
  ],
  templateUrl: './link-document-to-bill-dialog.component.html',
  styleUrl: './link-document-to-bill-dialog.component.scss'
})
export class LinkDocumentToBillDialogComponent {

  selectedBill?: Bill;

  @Input()
  visible = false;

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  bills: Bill[] = [];

  @Output()
  onValidate: EventEmitter<Bill> = new EventEmitter();
}
