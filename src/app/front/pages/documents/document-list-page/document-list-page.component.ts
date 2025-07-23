import {Component} from '@angular/core';
import {DocumentWsService} from '../../../../services/billkeeper-ws/document/document-ws.service';
import {ToastMessageService} from '../../../../services/toast-message.service';
import {BillDocument} from '../../../../services/billkeeper-ws/document/model';
import {MainLayoutComponent} from '../../../layouts/main-layout/main-layout.component';
import {DocumentCardComponent} from '../../../components/documents/document-card/document-card.component';
import {
  DocumentViewerDialogComponent
} from '../../../components/documents/document-viewer-dialog/document-viewer-dialog.component';
import {ValidationService} from '../../../../services/validation.service';
import {SideMenuService} from '../../../../services/side-menu.service';
import {Bill} from '../../../../services/billkeeper-ws/bill/model';
import {BillWsService} from '../../../../services/billkeeper-ws/bill/bill-ws.service';
import {
  LinkDocumentToBillDialogComponent
} from '../../../components/documents/link-document-to-bill-dialog/link-document-to-bill-dialog.component';
import {TopBarComponent} from '../../../components/layout/top-bar/top-bar.component';

@Component({
  selector: 'app-document-list-page',
  imports: [
    MainLayoutComponent,
    DocumentCardComponent,
    DocumentViewerDialogComponent,
    LinkDocumentToBillDialogComponent,
    TopBarComponent
  ],
  templateUrl: './document-list-page.component.html',
  styleUrl: './document-list-page.component.scss'
})
export class DocumentListPageComponent {

  documents: BillDocument[] = [];
  documentDialogVisible = false;
  visibleDocument: BillDocument = { };
  linkDocumentToBillDialogVisible = false;
  linkableBills: Bill[] = [];
  documentToLink?: BillDocument;

  constructor(
    private documentWsService: DocumentWsService,
    private billWsService: BillWsService,
    private sideMenuService: SideMenuService,
    private toastMessageService: ToastMessageService,
    private validationService: ValidationService
  ) {
  }

  async ngOnInit() {
    try {
      this.documents = await this.documentWsService.getAllOrphansDocuments();
      await this.updateLinkableBills();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  private async updateLinkableBills() {
    try {
      this.linkableBills = await this.billWsService.getAllBills();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  onSeeDocumentClick(document: BillDocument) {
    this.visibleDocument = document;
    this.documentDialogVisible = true;
  }

  onLinkDocumentClick(document: BillDocument) {
    this.documentToLink = document;
    this.linkDocumentToBillDialogVisible = true;
  }

  async onValidateDocumentLink(bill: Bill) {
    try {
      this.linkDocumentToBillDialogVisible = false;
      await this.documentWsService.updateDocument(this.documentToLink?.id!, {billId: bill.id});
      this.documentToLink = undefined;
      this.sideMenuService.updateSideMenu.next();
      this.documents = await this.documentWsService.getAllOrphansDocuments();
      await this.updateLinkableBills();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  onDeleteDocumentClick(document: BillDocument) {
    try {
      this.validationService.showConfirmationDialog(async () => {
        await this.documentWsService.deleteBillDocuments(document.id!);
        this.documents = await this.documentWsService.getAllOrphansDocuments();
        this.sideMenuService.updateSideMenu.next();
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }
}
