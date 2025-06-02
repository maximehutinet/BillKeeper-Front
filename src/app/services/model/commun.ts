import {BillStatus, Currency} from '../billkeeper-ws/bill/model';

export interface EnumDropdownOption {
  value: BillStatus | Currency | undefined
}

export class LocalStorageKeys {
  static readonly MENU_STATE = 'last_menu_state';
}
