import { Component } from '@angular/core';
import { Trip } from '../../../core/interfaces/trip.interface';
import { TripService } from '../../../core/services/trip.service';
import { RefundStatus } from '../../../core/enums/refund-status.enum';
import { take, tap } from 'rxjs';
import { TableColumn } from '../../../shared/components/data-table/table-config.interface.ts/table-column.interface';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-finance-view',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './finance-view.component.html',
  styleUrl: './finance-view.component.scss',
})
export class FinanceViewComponent {
  approvedTrips: Trip[] = [];
  columns: TableColumn[] = [
    { key: 'name', header: 'Trip Name' },
    { key: 'userId', header: 'User' },
    { key: 'dates', header: 'Dates', type: 'dateRange' },
    { key: 'totalAmount', header: 'Total Amount', type: 'currency' },
    { key: 'actions', header: 'Actions', type: 'action' },
  ];

  constructor(
    private tripService: TripService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadApprovedTrips();
  }

  private loadApprovedTrips(): void {
    this.tripService
      .getApprovedTrips()
      .pipe(take(1))
      .subscribe({
        next: (trips) => {
          this.approvedTrips = trips;
        },
      });
  }

  calculateTotal = (trip: Trip): number => {
    return trip.expenses.reduce((total, exp) => total + exp.totalPrice, 0);
  };

  getStatusClass = (status: string): string => {
    const statusClasses: { [key: string]: string } = {
      [RefundStatus.IN_PROCESS]: 'text-orange-500',
      [RefundStatus.REFUNDED]: 'text-green-500',
    };
    return statusClasses[status] || '';
  };

  getStatusIcon = (status: string): string => {
    const statusIcons: { [key: string]: string } = {
      [RefundStatus.IN_PROCESS]: 'pending',
      [RefundStatus.REFUNDED]: 'done_all',
    };
    const icon = statusIcons[status.trim()] || '';
    console.log('Status:', status, 'Icon:', icon);
    return icon;
  };

  updateStatus(event: { trip: Trip; status: RefundStatus }): void {
    const { trip, status } = event;
    this.tripService
      .updateRefundStatus(trip.id, status)
      .pipe(
        take(1),
        tap((updatedTrip) => {
          const index = this.approvedTrips.findIndex((t) => t.id === trip.id);
          if (index !== -1) {
            this.approvedTrips[index] = updatedTrip;
            this.approvedTrips = [...this.approvedTrips];
          }
        })
      )
      .subscribe({
        next: () => {
          this.snackBar.open('Refund status updated successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
          });
        },
        error: () => {
          this.snackBar.open(
            'Failed to update refund status. Please try again.',
            'Close',
            {
              duration: 3000,
              verticalPosition: 'bottom',
            }
          );
        },
      });
  }
}
