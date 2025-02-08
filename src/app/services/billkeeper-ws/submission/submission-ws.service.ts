import { Injectable } from '@angular/core';
import {HttpWsService} from '../http-ws.service';
import {CreateUpdateInsuranceSubmissionRequest, InsuranceSubmission} from './model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionWsService {

  constructor(
    private httpWsService: HttpWsService
  ) { }

  async getAllSubmissions(): Promise<InsuranceSubmission[]> {
    return this.httpWsService.get<InsuranceSubmission[]>("/submissions");
  }

  async getSubmission(submissionId: string): Promise<InsuranceSubmission> {
    return this.httpWsService.get<InsuranceSubmission>(`/submissions/${submissionId}`);
  }

  async createSubmission(submission: CreateUpdateInsuranceSubmissionRequest): Promise<void> {
    return this.httpWsService.post(`/submissions`, submission);
  }

  async updateSubmission(submissionId: string, submission: InsuranceSubmission): Promise<void> {
    return this.httpWsService.post(`/submissions/${submissionId}`, submission);
  }

  async deleteSubmission(submissionId: string): Promise<void> {
    return this.httpWsService.delete(`/submissions/${submissionId}`);
  }
}
