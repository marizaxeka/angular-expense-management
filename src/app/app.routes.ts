import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRole } from './core/enums/user-role.enum';
import { RoleGuard } from './core/guards/role.guard';


export const routes: Routes = [
    {
      path: '',
      loadComponent: () => 
        import('./auth/login/login.component').then(m => m.LoginComponent)
    },
    {
      path: 'trips',
      canActivate: [RoleGuard],
      data: { roles: [UserRole.END_USER] },
      children: [
        {
          path: '',
          loadComponent: () => import('./features/trips/trip-list/trip-list.component')
            .then(m => m.TripListComponent)
        },
        { 
          path: 'new',
          loadComponent: () => import('./features/trips/trip-form/trip-form.component')
            .then(m => m.TripFormComponent)
        },
        {
          path: ':id',
          loadComponent: () => import('./features/trips/trip-detail-view/trip-detail-view.component')
            .then(m => m.TripDetailViewComponent)
        }
      ]
    },
    {
      path: 'approvals',
      canActivate: [RoleGuard],
      data: { roles: [UserRole.APPROVER] },
      children: [
        {
          path: '',
          loadComponent: () =>
            import('./features/approval/approvals-list/approvals-list.component').then(m => m.ApprovalsListComponent),
        },
        {
          path: ':id',
          loadComponent: () =>
            import('./features/approval/approval-detail-view/approval-detail-view.component').then(m => m.ApprovalDetailViewComponent)
        }
      ]
    },
    {
      path: 'finance',
      canActivate: [RoleGuard],
      data: { roles: [UserRole.FINANCE] },
      children: [
        {
          path: '',
          loadComponent: () =>
            import('./features/finance/finance-view/finance-view.component').then(m => m.FinanceViewComponent),
        },
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: true })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }