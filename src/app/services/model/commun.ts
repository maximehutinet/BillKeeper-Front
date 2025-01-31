import {BillStatus, Currency} from '../billkeeper-ws/bill/model';

export interface EnumDropdownOption {
  value: BillStatus | Currency | undefined
}
