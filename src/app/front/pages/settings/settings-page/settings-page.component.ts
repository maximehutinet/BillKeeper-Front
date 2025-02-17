import {Component} from '@angular/core';
import {MainLayoutComponent} from "../../../layouts/main-layout/main-layout.component";
import {SettingsWsService} from '../../../../services/billkeeper-ws/settings/settings-ws.service';
import {MessageType, ToastMessageService} from '../../../../services/toast-message.service';
import {Settings} from '../../../../services/billkeeper-ws/settings/model';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {FloatLabel} from 'primeng/floatlabel';
import {TopBarComponent} from '../../../components/layout/top-bar/top-bar.component';
import {Button} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';

@Component({
  selector: 'app-settings-page',
  imports: [
    MainLayoutComponent,
    FormsModule,
    NgIf,
    FloatLabel,
    ReactiveFormsModule,
    TopBarComponent,
    Button,
    InputNumberModule,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {

  settings?: Settings;
  form!: FormGroup;

  constructor(
    private settingsWsService: SettingsWsService,
    private toastMessageService: ToastMessageService
  ) {
  }

  async ngOnInit() {
    try {
      this.settings = await this.settingsWsService.getSettings();
      this.buildForm();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  private buildForm() {
    this.form = new FormGroup({
        euroToUsdExchangeRate: new FormControl(this.settings?.euroToUsdExchangeRate ?? 1),
        chfToUsdExchangeRate: new FormControl(this.settings?.chfToUsdExchangeRate ?? 1),
    })
  }

  async onSave() {
    try {
      const request: Settings = {
        euroToUsdExchangeRate: this.form.value.euroToUsdExchangeRate,
        chfToUsdExchangeRate: this.form.value.chfToUsdExchangeRate
      }
      await this.settingsWsService.createUpdateSettings(request);
      this.settings = await this.settingsWsService.getSettings();
      this.toastMessageService.displayMessage("Modifications saved", MessageType.Success, "Settings")
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }
}
