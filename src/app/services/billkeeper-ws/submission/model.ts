import {Bill} from '../bill/model';

export interface InsuranceSubmission {
  id?: string;
  dateTime?: Date;
  name?: string;
}

export interface InsuranceSubmissionWithBills extends InsuranceSubmission {
  bills: Bill[];
  totalUsdAmount?: number;
}

export interface CreateUpdateInsuranceSubmissionRequest {
  name?: string;
  billIds?: string[];
}
