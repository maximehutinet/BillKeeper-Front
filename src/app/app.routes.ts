import { Routes } from '@angular/router';
import {HomePageComponent} from './front/pages/home-page/home-page.component';
import {BillPageComponent} from './front/pages/bill-page/bill-page.component';
import {EditBillPageComponent} from './front/pages/edit-bill-page/edit-bill-page.component';
import {SubmissionsPageComponent} from './front/pages/submissions-page/submissions-page.component';
import {SubmissionPageComponent} from './front/pages/submission-page/submission-page.component';

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'bill/:billId', component: BillPageComponent},
  {path: 'bill/:billId/edit', component: EditBillPageComponent},
  {path: 'submissions', component: SubmissionsPageComponent},
  {path: 'submissions/:submissionId', component: SubmissionPageComponent}
];
