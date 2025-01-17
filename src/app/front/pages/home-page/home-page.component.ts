import {Component} from '@angular/core';
import {Bill} from '../../../services/billkeeper-ws/bill/model';
import {BillWsService} from '../../../services/billkeeper-ws/bill/bill-ws.service';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-home-page',
  imports: [
    TableModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  bills: Bill[] = [];

  constructor(
    private billWsService: BillWsService
  ) {
  }

  async ngOnInit() {
    try {
      this.bills = await this.billWsService.getAllBills();
    } catch (e) {
      console.log(e)
    }
  }
}
