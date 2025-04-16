import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BillDocument} from '../../../../services/billkeeper-ws/document/model';
import {Button} from 'primeng/button';
import {NgIf} from '@angular/common';
import {PDFSource, PdfViewerModule} from 'ng2-pdf-viewer';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {AuthService} from '../../../../services/auth/auth.service';
import {DocumentPdfViewerComponent} from '../document-pdf-viewer/document-pdf-viewer.component';

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
    Tabs,
    DocumentPdfViewerComponent
  ],
  templateUrl: './documents-viewer.component.html',
  styleUrl: './documents-viewer.component.scss'
})
export class DocumentsViewerComponent {

  _documents: BillDocument[] = [];

  @Input()
  set documents(documents: BillDocument[]) {
    this._documents = documents;
    if (this._documents.length > 0) {
      this.activeDocumentId = this._documents[0].id;
      this.setSource();
    }
  };

  get documents() {
    return this._documents;
  }

  async setSource() {
    const token = await this.authService.getToken();
    this.src = {
      url: this._documents[0].url,
      httpHeaders: {Authorization : `Bearer ${token}`},
      withCredentials: true
    }
  }

  @Input()
  editMode = false;

  @Output()
  onEditDocumentDescription: EventEmitter<BillDocument> = new EventEmitter();

  @Output()
  onDownloadDocument: EventEmitter<BillDocument> = new EventEmitter();

  @Output()
  onDeleteDocument: EventEmitter<BillDocument> = new EventEmitter();

  src: PDFSource = {};

  activeDocumentId: string | undefined;

  constructor(private authService: AuthService) { }

}
