import {Component} from '@angular/core';
import {Bill, BillStatus, Currency} from '../../../../services/billkeeper-ws/bill/model';
import {MainLayoutComponent} from '../../../layouts/main-layout/main-layout.component';
import {Button} from 'primeng/button';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastMessageService} from '../../../../services/toast-message.service';
import {BillWsService} from '../../../../services/billkeeper-ws/bill/bill-ws.service';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Location, NgIf} from '@angular/common';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {InputMask} from 'primeng/inputmask';
import {BeneficiaryWsService} from '../../../../services/billkeeper-ws/beneficiary/beneficiary-ws.service';
import {EnumDropdownOption} from '../../../../services/model/commun';
import {Beneficiary} from '../../../../services/billkeeper-ws/beneficiary/model';
import {DocumentsViewerComponent} from '../../../components/documents/documents-viewer/documents-viewer.component';
import {BillDocument} from '../../../../services/billkeeper-ws/document/model';
import {LayoutService} from '../../../../services/layout.service';
import {Fieldset} from 'primeng/fieldset';
import {BeneficiarySelectOption} from '../../../components/bills/bills-filter/model';

@Component({
  selector: 'app-edit-bill-page',
  imports: [
    MainLayoutComponent,
    Button,
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    FormsModule,
    NgIf,
    InputNumberModule,
    DropdownModule,
    InputMask,
    DocumentsViewerComponent,
    Fieldset,
  ],
  templateUrl: './edit-bill-page.component.html',
  styleUrl: './edit-bill-page.component.scss'
})
export class EditBillPageComponent {

  bill: Bill = { }
  documents: BillDocument[] = [];
  form!: FormGroup;
  statusOptions: {name: string, billStatus: EnumDropdownOption}[] = [
    {name: "To file", billStatus: {value: BillStatus.TO_FILE}},
    {name: "Filed", billStatus: {value: BillStatus.FILED}},
    {name: "Reimbursed", billStatus: {value: BillStatus.REIMBURSED}},
  ];
  currencyOptions: {name: string, currency: EnumDropdownOption}[] = [
    {name: "CHF", currency: {value: Currency.CHF}},
    {name: "EURO", currency: {value: Currency.EURO}}
  ];
  beneficiaryOptions: BeneficiarySelectOption[] = [];
  billStatus?: EnumDropdownOption;
  billCurrency?: EnumDropdownOption;

  constructor(
    private billWsService: BillWsService,
    private beneficiaryWSService: BeneficiaryWsService,
    public location: Location,
    private activatedRoute: ActivatedRoute,
    private layoutService: LayoutService,
    private toastMessageService: ToastMessageService
  ) {
  }

  async ngOnInit() {
    try {
      await this.layoutService.withPageLoading(async () => {
        const billId = await this.activatedRoute.snapshot.params['billId'];
        this.bill = await this.billWsService.getBill(billId);
        this.documents = await this.billWsService.getBillDocuments(this.bill.id!);
        if (this.bill.status) {
          this.billStatus = {
            value: this.bill.status
          };
        }
        if (this.bill.currency) {
          this.billCurrency = {
            value: this.bill.currency
          }
        }
        const beneficiaries = await this.beneficiaryWSService.getAllBeneficiaries();
        this.buildBeneficiaryOptions(beneficiaries);
        this.buildForm();
      });
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  private buildBeneficiaryOptions(beneficiaries: Beneficiary[]) {
    this.beneficiaryOptions = beneficiaries.map((beneficiary) => {
      return {
        name: beneficiary.firstname,
        beneficiary: beneficiary
      }
    });
  }

  private buildForm() {
    this.form = new FormGroup({
      name: new FormControl(this.bill.name),
      amount: new FormControl(this.bill.amount),
      provider: new FormControl(this.bill.provider),
      beneficiary: new FormControl(this.bill.beneficiary)
    });
    if (this.bill.paidDateTime) {
      this.form.addControl("paidDateTime", new FormControl(this.bill.paidDateTime));
    }
  }

  async onSaveBill() {
    try {
      const updatedBill: Bill = {
        name: this.form.value.name,
        amount: this.form.value.amount,
        currency: <Currency> this.billCurrency?.value,
        paidDateTime: this.form.value.paidDateTime ? new Date(this.form.value.paidDateTime) : undefined,
        provider: this.form.value.provider,
        status: <BillStatus> this.billStatus?.value,
        beneficiary: this.form.value.beneficiary
      };
      await this.billWsService.updateBill(this.bill.id!, updatedBill);
      this.location.back();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  onDeletePaidOn() {
    this.form.value.paidDateTime = undefined;
  }

}
