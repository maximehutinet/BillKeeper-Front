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
import {DocumentListPageComponent} from './front/pages/documents/document-list-page/document-list-page.component';
import {
  EditSubmissionPageComponent
} from './front/pages/submissions/edit-submission-page/edit-submission-page.component';
import {canActivate} from './services/guards/auth.guard';

export const routes: Routes = [
  {path: '', component: BillsListPageComponent, canActivate: [canActivate]},
  {path: 'bill/:billId', component: BillDetailPageComponent, canActivate: [canActivate]},
  {path: 'bill/:billId/edit', component: EditBillPageComponent, canActivate: [canActivate]},
  {path: 'submissions', component: SubmissionsListPageComponent, canActivate: [canActivate]},
  {path: 'submissions/:submissionId', component: SubmissionDetailPageComponent, canActivate: [canActivate]},
  {path: 'submissions/:submissionId/edit', component: EditSubmissionPageComponent, canActivate: [canActivate]},
  {path: 'settings', component: SettingsPageComponent, canActivate: [canActivate]},
  {path: 'stats', component: StatsPageComponent, canActivate: [canActivate]},
  {path: 'documents', component: DocumentListPageComponent, canActivate: [canActivate]},
];
