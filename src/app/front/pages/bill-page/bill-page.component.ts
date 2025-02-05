import {Component} from '@angular/core';
import {MainLayoutComponent} from '../../layouts/main-layout/main-layout.component';
import {BillWsService} from '../../../services/billkeeper-ws/bill/bill-ws.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Bill, BillStatus} from '../../../services/billkeeper-ws/bill/model';
import {Button} from 'primeng/button';
import {CurrencyPipe} from '../../../services/pipes/currency.pipe';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Badge} from 'primeng/badge';
import {billStatusBadge, billStatusToString} from '../../../services/utils';
import {Tooltip} from 'primeng/tooltip';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {BillDocument} from '../../../services/billkeeper-ws/document/model';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {DocumentWsService} from '../../../services/billkeeper-ws/document/document-ws.service';
import {LayoutService} from '../../../services/layout.service';
import {ValidationService} from '../../../services/validation.service';
import {ToastMessageService} from '../../../services/toast-message.service';
import {FloatLabel} from 'primeng/floatlabel';
import {Textarea} from 'primeng/textarea';
import {FormsModule} from '@angular/forms';
import {CommentWsService} from '../../../services/billkeeper-ws/comment/comment-ws.service';
import {Fieldset} from 'primeng/fieldset';
import {CommentComponent} from '../../components/comment/comment.component';
import {BillComment} from '../../../services/billkeeper-ws/comment/model';
import {EditCommentDialogComponent} from '../../components/edit-comment-dialog/edit-comment-dialog.component';

@Component({
  selector: 'app-bill-page',
  imports: [
    MainLayoutComponent,
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
    TabPanel,
    FloatLabel,
    Textarea,
    FormsModule,
    Fieldset,
    CommentComponent,
    NgForOf,
    EditCommentDialogComponent
  ],
  templateUrl: './bill-page.component.html',
  styleUrl: './bill-page.component.scss'
})
export class BillPageComponent {

  protected readonly billStatusBadge = billStatusBadge;
  protected readonly billStatusToString = billStatusToString;
  protected readonly BillStatus = BillStatus;
  bill: Bill = {};
  documents: BillDocument[] = [];
  comments: BillComment[] = [];
  newCommentContent: string = "";
  editComment: BillComment = {
    id: "",
    content: "",
    dateTime: new Date()
  };
  editCommentDialogVisible = false;

  constructor(
    private billWsService: BillWsService,
    private documentWsService: DocumentWsService,
    private commentWsService: CommentWsService,
    private activatedRoute: ActivatedRoute,
    private layoutService: LayoutService,
    private router: Router,
    private validationService: ValidationService,
    private toastMessageService: ToastMessageService
  ) {
  }

  async ngOnInit() {
    try {
      await this.layoutService.withPageLoading(async () => {
        const billId = await this.activatedRoute.snapshot.params['billId'];
        this.bill = await this.billWsService.getBill(billId);
        await this.loadBillDocuments();
        await this.loadBillComments();
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async loadBillDocuments() {
    this.documents = await this.billWsService.getBillDocuments(this.bill.id!);
  }

  async loadBillComments() {
    this.comments = await this.commentWsService.getAllBillComments(this.bill.id!);
  }

  async onUploadDocuments(event: any) {
    try {
      await this.layoutService.withPageLoading(async () => {
        if (!event.target.files && !event.target.files[0]) {
          return;
        }
        await this.uploadDocuments(event.target.files);
        await this.loadBillDocuments();
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async uploadDocuments(files: FileList) {
    for (const file of Array.from(files)) {
      await this.billWsService.uploadBillDocument(this.bill.id!, file);
    }
  }

  async downloadBillDocument(documentId: string) {
    try {
      await this.layoutService.withPageLoading(async () => {
        await this.documentWsService.downloadBillDocument(documentId);
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onDeleteBillDocument(documentId: string) {
    try {
      this.validationService.showConfirmationDialog(async () => {
        await this.documentWsService.deleteBillDocuments(documentId);
        await this.loadBillDocuments();
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onMarkAsReimbursed() {
    try {
      await this.layoutService.withPageLoading(async () => {
        await this.billWsService.markBillAsReimbursed(this.bill.id!);
        this.bill = await this.billWsService.getBill(this.bill.id!);
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onMarkAsPaid() {
    try {
      await this.layoutService.withPageLoading(async () => {
        await this.billWsService.markBillAsPaid(this.bill.id!);
        this.bill = await this.billWsService.getBill(this.bill.id!);
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onDeleteBill() {
    this.validationService.showConfirmationDialog(async () => {
      await this.deleteBill();
    });
  }

  private async deleteBill() {
    try {
      await this.layoutService.withPageLoading(async () => {
        await this.billWsService.deleteBill(this.bill.id!);
      });
      await this.router.navigate([""])
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onAddComment() {
    try {
      await this.commentWsService.createComment(this.bill.id!, this.newCommentContent);
      this.newCommentContent = "";
      await this.loadBillComments();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onShowEditCommentDialog(comment: BillComment) {
    this.editComment = comment;
    this.editCommentDialogVisible = true;
  }

  async onEditComment(comment: BillComment) {
    try {
      this.editCommentDialogVisible = false;
      await this.commentWsService.updateComment(comment.id, comment.content);
      await this.loadBillComments();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onDeleteComment(commentId: string) {
    try {
      await this.commentWsService.deleteComment(commentId);
      await this.loadBillComments()
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }
}
