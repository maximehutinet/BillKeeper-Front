import {Component} from '@angular/core';
import {MainLayoutComponent} from '../../layouts/main-layout/main-layout.component';
import {BillWsService} from '../../../services/billkeeper-ws/bill/bill-ws.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Bill} from '../../../services/billkeeper-ws/bill/model';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {CurrencyPipe} from '../../../services/pipes/currency.pipe';
import {DatePipe, NgIf} from '@angular/common';
import {Badge} from 'primeng/badge';
import {billStatusBadge, billStatusToString} from '../../../services/utils';
import {Tooltip} from 'primeng/tooltip';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {BillDocument} from '../../../services/billkeeper-ws/document/model';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {DocumentWsService} from '../../../services/billkeeper-ws/document/document-ws.service';

@Component({
  selector: 'app-bill-page',
  imports: [
    MainLayoutComponent,
    Card,
    Button,
    RouterLink,
    CurrencyPipe,
    DatePipe,
    Badge,
    NgIf,
    Tooltip,
    PdfViewerModule,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
  ],
  templateUrl: './bill-page.component.html',
  styleUrl: './bill-page.component.scss'
})
export class BillPageComponent {

  protected readonly billStatusBadge = billStatusBadge;
  protected readonly billStatusToString = billStatusToString;
  bill: Bill = {};
  pageLoading = false;
  documents: BillDocument[] = [];

  constructor(
    private billWsService: BillWsService,
    private documentWsService: DocumentWsService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    try {
      const billId = await this.activatedRoute.snapshot.params['billId'];
      this.bill = await this.billWsService.getBill(billId);
      await this.loadBillDocuments();
    } catch (e) {
      console.log(e);
    }
  }

  async loadBillDocuments() {
    this.documents = await this.billWsService.getBillDocuments(this.bill.id!);
  }

  async onUploadDocuments(event: any) {
    try {
      this.pageLoading = true;
      if (!event.target.files && !event.target.files[0]) {
        return;
      }
      await this.uploadDocuments(event.target.files);
      await this.loadBillDocuments();
      this.pageLoading = false;
    } catch (e) {
      console.log(e);
    }
  }

  async uploadDocuments(files: FileList) {
    for (const file of Array.from(files)) {
      await this.billWsService.uploadBillDocument(this.bill.id!, file);
    }
  }

  async downloadBillDocument(documentId: string) {
    try {
      this.pageLoading = true;
      await this.documentWsService.downloadBillDocument(documentId);
      this.pageLoading = false;
    } catch (e) {
      console.log(e);
    }
  }

  async onDeleteBillDocument(documentId: string) {
    try {
      this.pageLoading = true;
      await this.documentWsService.deleteBillDocuments(documentId);
      await this.loadBillDocuments();
      this.pageLoading = false;
    } catch (e) {
      console.log(e);
    }
  }

}
