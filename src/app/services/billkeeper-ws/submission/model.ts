import {Bill} from '../bill/model';

export interface InsuranceSubmission {
  id: string;
  dateTime: Date;
  name: string;
  bills: Bill[]
}

export interface CreateUpdateInsuranceSubmissionRequest {
  name: string;
  billIds: string[];
}
