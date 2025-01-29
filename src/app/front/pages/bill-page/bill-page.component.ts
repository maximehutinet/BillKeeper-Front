import {Component} from '@angular/core';
import {MainLayoutComponent} from '../../layouts/main-layout/main-layout.component';
import {BillWsService} from '../../../services/billkeeper-ws/bill/bill-ws.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Bill} from '../../../services/billkeeper-ws/bill/model';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {CurrencyPipe} from '../../../services/pipes/currency.pipe';
import {DatePipe, NgIf} from '@angular/common';
import {Badge} from 'primeng/badge';
import {billStatusBadge, billStatusToString} from '../../../services/utils';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-bill-page',
  imports: [
    MainLayoutComponent,
    Card,
    Button,
    RouterLink,
    CurrencyPipe,
    DatePipe,
    Badge,
    NgIf,
    Tooltip
  ],
  templateUrl: './bill-page.component.html',
  styleUrl: './bill-page.component.scss'
})
export class BillPageComponent {

  bill: Bill = { };

  constructor(
    private billWsService: BillWsService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    try {
      const billId = await this.activatedRoute.snapshot.params['billId'];
      this.bill = await this.billWsService.getBill(billId);
    } catch (e) {
      console.log(e);
    }
  }

  protected readonly billStatusBadge = billStatusBadge;
  protected readonly billStatusToString = billStatusToString;
}
