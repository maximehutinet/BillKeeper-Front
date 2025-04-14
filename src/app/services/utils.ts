import {BillStatus} from './billkeeper-ws/bill/model';
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

export function loadEnvironment() {
  let keycloakUrl = '';
  let keycloakRealm = '';
  let keycloakClientId = '';
  let serverUrl = '';

  try {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/configuration.json?time=' + Date.now(), false);
    xhr.send(null);

    if (xhr.status === 200) {
      const envProperties = JSON.parse(xhr.responseText);
      keycloakUrl = envProperties.keycloakConfiguration.url;
      keycloakRealm = envProperties.keycloakConfiguration.realm;
      keycloakClientId = envProperties.keycloakConfiguration.clientId;
      serverUrl = envProperties.serverUrl;
    }
  } catch (error) { }
  return { keycloakUrl, keycloakRealm, keycloakClientId, serverUrl };
}
