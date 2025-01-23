import { Component} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Trip } from '../../../core/interfaces/trip.interface';
import { TripService } from '../../../core/services/trip.service';
import { TripStatus } from '../../../core/enums/trip-status.enum';
import { MatSnackBar,  } from '@angular/material/snack-bar';
import { DataTableComponent } from '../../../shared/components/data-table/data-table/data-table.component';
import { TableColumn } from '../../../shared/components/data-table/table-config.interface.ts/table-column.interface';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    DataTableComponent,
  ],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.scss',
})
export class TripListComponent {
  trips: Trip[] = [];
  columns: TableColumn[] = [
    {
      key: 'name',
      header: 'Trip Name',
      type: 'text',
    },
    {
      key: 'startDate',
      header: 'Dates',
      type: 'dateRange',
    },
    {
      key: 'duration',
      header: 'Duration',
      type: 'text',
    },
    {
      key: 'status',
      header: 'Status',
      type: 'status',
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
        {
          icon: 'send',
          tooltip: 'Send for Approval',
          action: (trip: Trip) => this.sendForApproval(trip),
          condition: (trip: Trip) => trip.status === TripStatus.DRAFT,
        },
      ],
    },
  ];
  statusClasses: Record<TripStatus, string> = {
    [TripStatus.APPROVED]: 'text-green-600',
    [TripStatus.REJECTED]: 'text-red-600',
    [TripStatus.PENDING]: 'text-yellow-600',
    [TripStatus.DRAFT]: 'text-gray-600',
  };
  constructor(
    private tripService: TripService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  viewDetails(trip: Trip): void {
    this.router.navigate(['/trips', trip.id]);
  }

  private loadTrips(): void {
    this.tripService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
      },
      error: () => {
        this.snackBar.open('Failed to load trips', 'Close', { duration: 3000 });
      },
    });
  }

  sendForApproval(trip: Trip): void {
    if (trip.expenses.length === 0) {
      this.snackBar.open('Cannot submit a trip without expenses', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.tripService.updateTripStatus(trip.id, TripStatus.PENDING).subscribe({
      next: (updatedTrip) => {
        const index = this.trips.findIndex((t) => t.id === trip.id);
        if (index !== -1) {
          this.trips[index] = updatedTrip;
          this.trips = [...this.trips];
        }
        this.snackBar.open('Trip sent for approval successfully', 'Close', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackBar.open('Failed to send trip for approval', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  getStatusClass = (status: string): string => {
    const tripStatus = status as TripStatus;
    return this.statusClasses[tripStatus] || '';
  };
}
