// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UserRole } from './core/enums/user-role.enum';
import { RoleGuard } from './core/guards/role.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutRouterComponent } from './layout/layout-router';
import { LayoutComponent } from './layout/layout/layout.component';


export const routes: Routes = [
    {
      path: '',
      loadComponent: () => 
        import('./auth/login/login.component').then(m => m.LoginComponent)
    },
    {
      path: 'main',
      component: LayoutComponent,
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      children: [
        {
          path: 'trips',
          component: LayoutRouterComponent,
          children: [
            {
              path: '',
              loadComponent: () =>
                import('./features/trips/trip-list/trip-list.component').then(m => m.TripListComponent)
            },
            {
              path: 'new',
              loadComponent: () =>
                import('./features/trips/trip-form/trip-form.component').then(m => m.TripFormComponent)
            },
            {  // Add this route for trip details
                path: ':id',
                loadComponent: () =>
                  import('./features/trips/trip-detail-view/trip-detail-view.component').then(m => m.TripDetailViewComponent)
              }
          ]
        },
        {
          path: 'approvals',
          component: LayoutRouterComponent,
          canActivate: [RoleGuard],
          data: { roles: [UserRole.APPROVER] },
          children: [
            {
              path: '',
              loadComponent: () =>
                import('./features/approval/approvals-list/approvals-list.component').then(m => m.ApprovalsListComponent)
            },
            {
              path: ':id',
              loadComponent: () =>
                import('./features/trips/trip-detail-view/trip-detail-view.component').then(m => m.TripDetailViewComponent)
            }
          ]
        },
        {
          path: 'finance',
          component: LayoutRouterComponent,
          canActivate: [RoleGuard],
          data: { roles: [UserRole.FINANCE] },
          children: [
            {
              path: '',
              loadComponent: () =>
                import('./features/finance/finance-dashboard/finance-dashboard.component').then(m => m.FinanceDashboardComponent)
            }
          ]
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }