import {Component} from '@angular/core';
import {BillStatusBadgeComponent} from "../../../components/bills/bill-status-badge/bill-status-badge.component";
import {Button} from "primeng/button";
import {CommentComponent} from "../../../components/comments/comment/comment.component";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {DocumentsViewerComponent} from "../../../components/documents/documents-viewer/documents-viewer.component";
import {
  EditCommentDialogComponent
} from "../../../components/comments/edit-comment-dialog/edit-comment-dialog.component";
import {EditNameDialogComponent} from "../../../components/commun/edit-name-dialog/edit-name-dialog.component";
import {Fieldset} from "primeng/fieldset";
import {FloatLabel} from "primeng/floatlabel";
import {FormsModule} from "@angular/forms";
import {MainLayoutComponent} from "../../../layouts/main-layout/main-layout.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Textarea} from "primeng/textarea";
import {Tooltip} from "primeng/tooltip";
import {Bill, BillStatus, ParsingJobStatus} from '../../../../services/billkeeper-ws/bill/model';
import {BillDocument} from '../../../../services/billkeeper-ws/document/model';
import {BillComment} from '../../../../services/billkeeper-ws/comment/model';
import {BillWsService} from '../../../../services/billkeeper-ws/bill/bill-ws.service';
import {DocumentWsService} from '../../../../services/billkeeper-ws/document/document-ws.service';
import {CommentWsService} from '../../../../services/billkeeper-ws/comment/comment-ws.service';
import {LayoutService} from '../../../../services/layout.service';
import {ValidationService} from '../../../../services/validation.service';
import {MessageType, ToastMessageService} from '../../../../services/toast-message.service';
import {
  TopBarWithBackButtonComponent
} from '../../../components/layout/top-bar-with-back-button/top-bar-with-back-button.component';
import {
  CopyToClipboardIconComponent
} from '../../../components/commun/copy-to-clipboard-icon/copy-to-clipboard-icon.component';
import {ValueLoadingOrNsComponent} from '../../../components/commun/value-loading-or-ns/value-loading-or-ns.component';

@Component({
  selector: 'app-bill-detail-page',
  imports: [
    BillStatusBadgeComponent,
    Button,
    CommentComponent,
    CurrencyPipe,
    DatePipe,
    DocumentsViewerComponent,
    EditCommentDialogComponent,
    EditNameDialogComponent,
    Fieldset,
    FloatLabel,
    FormsModule,
    MainLayoutComponent,
    NgForOf,
    NgIf,
    RouterLink,
    Textarea,
    Tooltip,
    CurrencyPipe,
    TopBarWithBackButtonComponent,
    CopyToClipboardIconComponent,
    ValueLoadingOrNsComponent
  ],
  templateUrl: './bill-detail-page.component.html',
  styleUrl: './bill-detail-page.component.scss'
})
export class BillDetailPageComponent {

  protected readonly BillStatus = BillStatus;
  protected readonly ParsingJobStatus = ParsingJobStatus;

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
  editDocumentDescriptionDialogVisible = false;
  editedDocument: BillDocument = {};
  private dragCounter = 0;

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

  async downloadBillDocument(document: BillDocument) {
    try {
      await this.layoutService.withPageLoading(async () => {
        await this.documentWsService.downloadBillDocument(document.id!);
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onDeleteBillDocument(document: BillDocument) {
    try {
      this.validationService.showConfirmationDialog(async () => {
        await this.documentWsService.deleteBillDocuments(document.id!);
        await this.loadBillDocuments();
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onMarkAsReimbursed() {
    try {
      await this.layoutService.withPageLoading(async () => {
        await this.billWsService.markBillAsReimbursed(this.bill);
        this.bill = await this.billWsService.getBill(this.bill.id!);
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onMarkAsPaid() {
    try {
      await this.layoutService.withPageLoading(async () => {
        await this.billWsService.markBillAsPaid(this.bill);
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

  async onRejectBill() {
    try {
      await this.billWsService.markBillAsRejected(this.bill);
      this.bill = await this.billWsService.getBill(this.bill.id!);
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
      this.validationService.showConfirmationDialog(async () => {
        await this.commentWsService.deleteComment(commentId);
        await this.loadBillComments()
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async downloadBillDocumentsMerged() {
    try {
      await this.documentWsService.getMergedBillsDocuments([this.bill.id!]);
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  onEditDocumentDescription(document: BillDocument) {
    this.editedDocument = document;
    this.editDocumentDescriptionDialogVisible = true;
  }

  async onValidateNewDocumentDescription(description: string) {
    try {
      await this.documentWsService.updateDocument(this.editedDocument.id!, {description: description});
      await this.loadBillDocuments();
      this.editDocumentDescriptionDialogVisible = false;
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onDrop(event: any) {
    this.layoutService.pageFocusing = false;
    await this.layoutService.withPageLoading(async () => {
      if (event.dataTransfer.items) {
        for (const item of [...event.dataTransfer.items]) {
          if (item.kind === "file") {
            const file = item.getAsFile();
            const fileExtension = file.name.split(".").pop();
            if (fileExtension != "pdf") {
              this.toastMessageService.displayMessage(`${file.name} couldn't be uploaded because it's not a PDF`, MessageType.Error, "File error");
              return;
            }
            await this.billWsService.uploadBillDocument(this.bill.id!, file);
            await this.loadBillDocuments();
          }
        }
      }
    });
  }

  onDragLeave() {
    this.dragCounter -= 1;
    if (this.dragCounter === 0) {
      this.layoutService.pageFocusing = false;
    }
  }

  onDragEnter() {
    this.dragCounter += 1;
    this.layoutService.pageFocusing = true;
  }
}
