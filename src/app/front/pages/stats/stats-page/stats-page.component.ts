import {Component} from '@angular/core';
import {MainLayoutComponent} from "../../../layouts/main-layout/main-layout.component";
import {StatsWsService} from '../../../../services/billkeeper-ws/stats/stats-ws.service';
import {Stats} from '../../../../services/billkeeper-ws/stats/model';
import {ToastMessageService} from '../../../../services/toast-message.service';
import {TopBarComponent} from "../../../components/layout/top-bar/top-bar.component";
import {StatsCardComponent} from '../../../components/stats/stats-card/stats-card.component';

@Component({
  selector: 'app-stats-page',
  imports: [
    MainLayoutComponent,
    TopBarComponent,
    StatsCardComponent
  ],
  templateUrl: './stats-page.component.html',
  styleUrl: './stats-page.component.scss'
})
export class StatsPageComponent {

  stats: Stats = {
    totalUsdAmountToBeReimbursed: 0,
    totalUsdAmountToPay: 0,
    billToFileCount: 0,
    billInProgressCount: 0
  };

  constructor(
    private statsWsService: StatsWsService,
    private toastMessageService: ToastMessageService
  ) {
  }

  async ngOnInit() {
    try {
      this.stats = await this.statsWsService.getBillsStats();
      console.log(this.stats)
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }
}
