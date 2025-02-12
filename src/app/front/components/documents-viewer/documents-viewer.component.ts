import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BillDocument} from '../../../services/billkeeper-ws/document/model';
import {Button} from 'primeng/button';
import {NgIf} from '@angular/common';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';

@Component({
  selector: 'app-documents-viewer',
  imports: [
    Button,
    NgIf,
    PdfViewerModule,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
  ],
  templateUrl: './documents-viewer.component.html',
  styleUrl: './documents-viewer.component.scss'
})
export class DocumentsViewerComponent {

  @Input()
  documents: BillDocument[] = [];

  @Input()
  editMode = false;

  @Output()
  onEditDocumentDescription: EventEmitter<BillDocument> = new EventEmitter();

  @Output()
  onDownloadDocument: EventEmitter<BillDocument> = new EventEmitter();

  @Output()
  onDeleteDocument: EventEmitter<BillDocument> = new EventEmitter();
}
