import {Beneficiary} from '../beneficiary/model';
import {InsuranceSubmission} from '../submission/model';

export interface Bill {
  id?: string;
  dateTime?: Date;
  name?: string;
  amount?: number;
  currency?: Currency;
  paidDateTime?: Date;
  provider?: string;
  status?: BillStatus;
  beneficiary?: Beneficiary;
  submission?: InsuranceSubmission;
}

export enum Currency {
  CHF = "CHF",
  EURO = "EUR"
}

export enum BillStatus {
  TO_FILE = "TO_FILE",
  FILED = "FILED",
  REIMBURSED = "REIMBURSED"
}


