import {Bill, BillStatus, Currency} from './billkeeper-ws/bill/model';
import {ExchangeRate} from './model/commun';
import {InsuranceSubmissionWithBills} from './billkeeper-ws/submission/model';

export function billStatusToString(status: BillStatus | undefined): string {
  switch (status) {
    case BillStatus.TO_FILE:
      return "To file";
    case BillStatus.FILED:
      return "Filed"
    case BillStatus.REIMBURSED:
      return "Reimbursed"
    default:
      return "Status missing";
  }
}

export function billStatusBadge(status: BillStatus | undefined): "info" | "success" | "warn" | "danger" | "secondary" | "contrast" | "help" | "primary" {
  switch (status) {
    case BillStatus.TO_FILE:
      return "warn";
    case BillStatus.FILED:
      return "info"
    case BillStatus.REIMBURSED:
      return "success"
    default:
      return "danger";
  }
}

export function markAsPaidSubmissionButtonVisible(submission: InsuranceSubmissionWithBills): boolean {
  return submission.bills.filter(bill => !bill.paidDateTime).length === submission.bills.length;
}

export function markAsReimbursedSubmissionButtonVisible(submission: InsuranceSubmissionWithBills): boolean {
  return submission.bills.filter(bill => bill.status !== BillStatus.REIMBURSED).length === submission.bills.length;
}
