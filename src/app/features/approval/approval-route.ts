import { Routes } from '@angular/router';
import { ApprovalsListComponent } from './approvals-list/approvals-list.component';
import { TripDetailViewComponent } from '../trips/trip-detail-view/trip-detail-view.component';

export const APPROVALS_ROUTES: Routes = [
  { path: '', component: ApprovalsListComponent },
  { path: ':id', component: TripDetailViewComponent }
];