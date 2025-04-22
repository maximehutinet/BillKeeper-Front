import {Bill} from '../bill/model';

export enum SubmissionStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED"
}

export interface InsuranceSubmission {
  id?: string;
  dateTime?: Date;
  name?: string;
  eclaimId?: string;
  status?: SubmissionStatus;
}

export interface InsuranceSubmissionWithBills extends InsuranceSubmission {
  bills: Bill[];
  totalUsdAmount?: number;
}

export interface CreateUpdateInsuranceSubmissionRequest {
  name?: string;
  eClaimId?: string;
  billIds?: string[];
}
