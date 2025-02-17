import {Component} from '@angular/core';
import {MainLayoutComponent} from "../../../layouts/main-layout/main-layout.component";
import {StatsWsService} from '../../../../services/billkeeper-ws/stats/stats-ws.service';
import {Stats} from '../../../../services/billkeeper-ws/stats/model';
import {ToastMessageService} from '../../../../services/toast-message.service';

@Component({
  selector: 'app-stats-page',
  imports: [
    MainLayoutComponent
  ],
  templateUrl: './stats-page.component.html',
  styleUrl: './stats-page.component.scss'
})
export class StatsPageComponent {

  stats: Stats = {
    totalActiveBills: 0,
  }

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
