import {Beneficiary} from '../beneficiary/model';
import {InsuranceSubmission} from '../submission/model';
import {User} from '../user/model';

export interface Bill {
  id?: string;
  dateTime?: Date;
  name?: string;
  amount?: number;
  user?: User;
  currency?: Currency;
  serviceDateTime?: Date;
  paidDateTime?: Date;
  provider?: string;
  status?: BillStatus;
  beneficiary?: Beneficiary;
  submission?: InsuranceSubmission;
  parsingJobStatus?: ParsingJobStatus;
}

export enum Currency {
  CHF = "CHF",
  EURO = "EUR"
}

export enum BillStatus {
  TO_FILE = "TO_FILE",
  FILED = "FILED",
  REIMBURSED = "REIMBURSED",
  REJECTED = "REJECTED"
}

export enum ParsingJobStatus {
  IN_PROGRESS = "IN_PROGRESS",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED"
}


