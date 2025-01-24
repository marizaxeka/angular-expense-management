import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/enums/user-role.enum';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavItem } from '../../core/interfaces/nav-item.interface';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private authService = inject(AuthService);
  currentUser$ = this.authService.currentUser$;
  UserRole = UserRole;

  navigationItems: NavItem[] = [
    {
      path: '/trips',
      icon: 'list',
      label: 'Trips List',
      roles: [UserRole.END_USER],
    },
    {
      path: '/trips/new',
      icon: 'add',
      label: 'Create Trip',
      roles: [UserRole.END_USER],
    },
    {
      path: '/approvals',
      icon: 'approval',
      label: 'Pending Approvals',
      roles: [UserRole.APPROVER],
    },
    {
      path: '/finance',
      icon: 'account_balance',
      label: 'Finance Dashboard',
      roles: [UserRole.FINANCE],
    },
  ];

  hasRole(roles: UserRole[]): boolean {
    const currentUser = this.authService.currentUser;
    return currentUser ? roles.includes(currentUser.role) : false;
  }

  logout(): void {
    this.authService.logout();
  }
}
