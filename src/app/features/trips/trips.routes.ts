import { Routes } from '@angular/router';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { TripDetailViewComponent } from './trip-detail-view/trip-detail-view.component';

export const TRIPS_ROUTES: Routes = [
  { path: '', component: TripListComponent },
  { path: 'new', component: TripFormComponent },
  { path: ':id', component: TripDetailViewComponent }

]