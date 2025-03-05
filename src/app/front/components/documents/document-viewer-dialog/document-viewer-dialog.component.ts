import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {BillDocument} from '../../../../services/billkeeper-ws/document/model';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {DocumentPdfViewerComponent} from '../document-pdf-viewer/document-pdf-viewer.component';

@Component({
  selector: 'app-document-viewer-dialog',
  imports: [
    Dialog,
    PdfViewerModule,
    DocumentPdfViewerComponent
  ],
  templateUrl: './document-viewer-dialog.component.html',
  styleUrl: './document-viewer-dialog.component.scss'
})
export class DocumentViewerDialogComponent {

  @Input()
  visible = false;

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  document: BillDocument = { }
}
