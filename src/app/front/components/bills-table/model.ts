import {Bill} from '../../../services/billkeeper-ws/bill/model';

export interface BillTableRow {
  checked: boolean;
  bill: Bill;
}
