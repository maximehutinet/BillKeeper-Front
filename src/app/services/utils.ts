import {BillStatus} from './billkeeper-ws/bill/model';

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
