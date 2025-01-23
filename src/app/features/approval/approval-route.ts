import { Routes } from '@angular/router';
import { ApprovalsListComponent } from './approvals-list/approvals-list.component';
import { ApprovalDetailViewComponent } from './approval-detail-view/approval-detail-view.component';

export const APPROVALS_ROUTES: Routes = [
  { path: '', component: ApprovalsListComponent },
  { path: ':id', component: ApprovalDetailViewComponent }
];