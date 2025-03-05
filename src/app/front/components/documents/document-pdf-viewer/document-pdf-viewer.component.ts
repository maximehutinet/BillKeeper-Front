import {Component, Input} from '@angular/core';
import {BillDocument} from '../../../../services/billkeeper-ws/document/model';
import {PDFSource, PdfViewerModule} from 'ng2-pdf-viewer';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-document-pdf-viewer',
  imports: [
    PdfViewerModule
  ],
  templateUrl: './document-pdf-viewer.component.html',
  styleUrl: './document-pdf-viewer.component.scss'
})
export class DocumentPdfViewerComponent {

  src: PDFSource = {};
  _document: BillDocument = {};

  @Input()
  set document(document: BillDocument) {
    this._document = document;
    this.setSource();
  }

  constructor(private authService: AuthService) { }

  async setSource() {
    const token = await this.authService.getToken();
    this.src = {
      url: this._document.url,
      httpHeaders: {Authorization : `Bearer ${token}`},
      withCredentials: true
    }
  }
}
