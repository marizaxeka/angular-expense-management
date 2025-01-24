import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../../../core/services/trip.service';
import { Trip } from '../../../core/interfaces/trip.interface';
import { TableColumn } from '../../../shared/components/data-table/table-config.interface.ts/table-column.interface';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-approvals-list',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './approvals-list.component.html',
  styleUrl: './approvals-list.component.scss',
})
export class ApprovalsListComponent {
  pendingTrips: Trip[] = [];
  columns: TableColumn[] = [
    { key: 'name', header: 'Trip Name', type: 'text' },
    { key: 'userId', header: 'User', type: 'text' },
    { key: 'startDate', header: 'Dates', type: 'dateRange' },
    {
      key: 'totalAmount',
      header: 'Total Amount',
      type: 'currency',
      format: '1.2-2',
    },
    {
      key: 'actions',
      header: 'Actions',
      type: 'action',
      actions: [
        {
          icon: 'visibility',
          tooltip: 'View Details',
          action: (trip: Trip) => this.viewDetails(trip),
        },
      ],
    },
  ];

  constructor(private tripService: TripService, private router: Router) {}

  ngOnInit(): void {
    this.loadPendingTrips();
  }

  private loadPendingTrips(): void {
    this.tripService.getPendingTrips().pipe(take(1)).subscribe({
      next: (trips) => (this.pendingTrips = trips),
    });
  }

  viewDetails(trip: Trip): void {
    this.router.navigate(['/approvals', trip.id]);
  }

  calculateTotalAmount = (trip: Trip): number => {
    return trip.expenses.reduce((total, exp) => total + exp.totalPrice, 0);
  };
}
