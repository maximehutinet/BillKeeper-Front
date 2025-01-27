import {BillStatus} from './billkeeper-ws/bill/model';

export function billStatusToString(status: BillStatus): string {
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
