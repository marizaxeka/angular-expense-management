import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Trip } from '../../../core/interfaces/trip.interface';
import { TripService } from '../../../core/services/trip.service';
import { TripStatus } from '../../../core/enums/trip-status.enum';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [   
    CommonModule,
      RouterModule,
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatSnackBarModule,
      MatTooltipModule
    ],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.scss'
})
export class TripListComponent {
  trips: Trip[] = [];
  displayedColumns = ['name', 'dates', 'duration', 'status', 'actions'];
  TripStatus = TripStatus;

  constructor(private tripService: TripService,private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }


  private loadTrips(): void {
    this.tripService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
      },
      error: () => {
        this.snackBar.open('Failed to load trips', 'Close', { duration: 3000 });
      }
    });
  }

  sendForApproval(trip: Trip): void {
    if (trip.expenses.length === 0) {
      this.snackBar.open('Cannot submit a trip without expenses', 'Close', { duration: 3000 });
      return;
    }
    this.tripService.updateTripStatus(trip.id, TripStatus.PENDING).subscribe({
      next: (updatedTrip) => {
        const index = this.trips.findIndex(t => t.id === trip.id);
        if (index !== -1) {
          this.trips[index] = updatedTrip;
          this.trips = [...this.trips];
        }
        this.snackBar.open('Trip sent for approval successfully', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to send trip for approval', 'Close', { duration: 3000 });
      }
    });
  }

}
