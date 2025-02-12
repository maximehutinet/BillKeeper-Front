import {Bill, BillStatus, Currency} from './billkeeper-ws/bill/model';
import {ExchangeRate} from './model/commun';

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

export function convertCurrency(source: Currency, destination: Currency, amount: number): number | undefined {
  const exchangeRates: ExchangeRate[] = [
    {
      source: Currency.EURO,
      destination: Currency.USD,
      rate: 1.04
    },
    {
      source: Currency.CHF,
      destination: Currency.USD,
      rate: 1.09
    }
  ];
  const rate = exchangeRates
    .filter(value => value.source === source && value.destination === destination)
    .map(value => value.rate)
    .pop();
  if (rate) {
    return amount * rate;
  }
  return undefined;
}

export function getApproximateTotalDollarValue(bills: Bill[]) {
  const value = bills
    .filter(bill => bill.currency && bill.amount)
    .map(bill => convertCurrency(bill.currency!, Currency.USD, bill.amount!))
    .reduce((p, c) => {
      return (p ?? 0) + (c ?? 0)
    }, 0);
  return value?.toFixed(2);
}
