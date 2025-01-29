import { Routes } from '@angular/router';
import {HomePageComponent} from './front/pages/home-page/home-page.component';
import {BillPageComponent} from './front/pages/bill-page/bill-page.component';

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'bill/:billId', component: BillPageComponent}
];
