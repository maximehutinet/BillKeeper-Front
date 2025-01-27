import { Injectable } from '@angular/core';
import {HttpWsService} from '../http-ws.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentWsService {

  constructor(
    private httpWsService: HttpWsService
  ) { }

  public getMergedBillsDocuments(billIds: string[]) {
    return this.httpWsService.downloadBlob(`/documents/bills/${billIds.join(",")}`, "MergedFile.pdf")
  }
}
