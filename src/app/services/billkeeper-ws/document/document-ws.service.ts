import {Injectable} from '@angular/core';
import {HttpWsService} from '../http-ws.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentWsService {

  constructor(
    private httpWsService: HttpWsService
  ) { }

  public getMergedBillsDocuments(billIds: string[]) {
    return this.httpWsService.downloadBlob(`/documents?billIds=${billIds.join(",")}`, "MergedFile.pdf")
  }

  public downloadBillDocument(documentId: string) {
    return this.httpWsService.downloadBlob(`/documents/${documentId}`, `${documentId}.pdf`);
  }

  async deleteBillDocuments(documentId: string): Promise<void> {
    return this.httpWsService.delete(`/documents/${documentId}`);
  }

  async updateDocumentDescription(documentId: string, description: string): Promise<void> {
    return this.httpWsService.post(`/documents/${documentId}`, {description: description});
  }
}
