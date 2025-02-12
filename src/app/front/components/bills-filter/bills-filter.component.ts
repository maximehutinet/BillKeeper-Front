import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Bill, BillStatus} from '../../../services/billkeeper-ws/bill/model';
import {Beneficiary} from '../../../services/billkeeper-ws/beneficiary/model';
import {BeneficiarySelectOption, StatusSelectOption} from './model';
import {MultiSelect} from 'primeng/multiselect';
import {FormsModule} from '@angular/forms';
import {billStatusToString} from '../../../services/utils';

@Component({
  selector: 'app-bills-filter',
  imports: [
    MultiSelect,
    FormsModule
  ],
  templateUrl: './bills-filter.component.html',
  styleUrl: './bills-filter.component.scss'
})
export class BillsFilterComponent {

  beneficiaryOptions: BeneficiarySelectOption[] = [];
  selectedBeneficiaries: BeneficiarySelectOption[] = [];

  statusOptions: StatusSelectOption[] = [];
  selectedStatus: StatusSelectOption[] = [];

  private _bills: Bill[] = [];

  @Input()
  set bills(value: Bill[]) {
    this._bills = value;
    this.updateSelectOptions();
  }

  @Output()
  billsChange: EventEmitter<Bill[]> = new EventEmitter();

  private updateSelectOptions() {
    this._bills.forEach(bill => {
      if (bill.beneficiary && !this.beneficiaryOptionsContainsBeneficiary(this.beneficiaryOptions, bill.beneficiary)) {
        this.beneficiaryOptions.push({
          name: bill.beneficiary!.firstname,
          beneficiary: bill.beneficiary!
        });
      }
      if (bill.status && !this.statusOptionsContainsStatus(this.statusOptions, bill.status)) {
        this.statusOptions.push({
          name: billStatusToString(bill.status),
          billStatus: {value: bill.status}
        });
      }
    });
  }

  private beneficiaryOptionsContainsBeneficiary(options: BeneficiarySelectOption[], beneficiary: Beneficiary): boolean {
    return options
      .filter(option => option.beneficiary.id === beneficiary.id)
      .length > 0;
  }

  private statusOptionsContainsStatus(options: StatusSelectOption[], status: BillStatus): boolean {
    return options
      .filter(option => option.billStatus.value === status)
      .length > 0;
  }

  private billHasSelectedBeneficiary(bill: Bill): boolean {
    if (this.selectedBeneficiaries.length === 0) {
      return true;
    }
    return (bill.beneficiary !== undefined && this.beneficiaryOptionsContainsBeneficiary(this.selectedBeneficiaries, bill.beneficiary));
  }

  private billHasSelectedStatus(bill: Bill): boolean {
    if (this.selectedStatus.length === 0) {
      return true;
    }
    return (bill.status !== undefined && this.statusOptionsContainsStatus(this.selectedStatus, bill.status));
  }

  onSelectChange() {
    const filteredBills = this._bills
      .filter(bill => this.billHasSelectedBeneficiary(bill))
      .filter(bill => this.billHasSelectedStatus(bill));
    this.billsChange.emit(filteredBills);
  }

}
