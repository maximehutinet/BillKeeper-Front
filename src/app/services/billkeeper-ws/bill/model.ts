export interface Bill {
  id: string;
  dateTime?: Date;
  name: string;
  amount?: number;
  paidDateTime?: Date;
  provider?: string;
  status: BillStatus;
  beneficiary: Beneficiary;
}

export enum BillStatus {
  TO_FILE,
  FILED,
  REIMBURSED
}

export interface Beneficiary {
  id: string;
  firstname: string;
}
