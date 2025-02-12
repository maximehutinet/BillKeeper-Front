import {Routes} from '@angular/router';
import {EditBillPageComponent} from './front/pages/bills/edit-bill-page/edit-bill-page.component';
import {
  SubmissionDetailPageComponent
} from './front/pages/submissions/submission-detail-page/submission-detail-page.component';
import {
  SubmissionsListPageComponent
} from './front/pages/submissions/submissions-list-page/submissions-list-page.component';
import {BillsListPageComponent} from './front/pages/bills/bills-list-page/bills-list-page.component';
import {BillDetailPageComponent} from './front/pages/bills/bill-detail-page/bill-detail-page.component';
import {SettingsPageComponent} from './front/pages/settings/settings-page/settings-page.component';
import {StatsPageComponent} from './front/pages/stats/stats-page/stats-page.component';

export const routes: Routes = [
  {path: '', component: BillsListPageComponent},
  {path: 'bill/:billId', component: BillDetailPageComponent},
  {path: 'bill/:billId/edit', component: EditBillPageComponent},
  {path: 'submissions', component: SubmissionsListPageComponent},
  {path: 'submissions/:submissionId', component: SubmissionDetailPageComponent},
  {path: 'settings', component: SettingsPageComponent},
  {path: 'stats', component: StatsPageComponent},
];
