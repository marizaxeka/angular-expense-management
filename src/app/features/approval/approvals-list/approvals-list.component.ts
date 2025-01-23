import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { TripService } from '../../../core/services/trip.service';
import { Trip } from '../../../core/interfaces/trip.interface';

@Component({
  selector: 'app-approvals-list',
  standalone: true,
  imports: [    
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './approvals-list.component.html',
  styleUrl: './approvals-list.component.scss'
})
export class ApprovalsListComponent {
  pendingTrips: Trip[] = [];
  displayedColumns = ['name', 'user', 'dates', 'totalAmount', 'actions'];
  
  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getPendingTrips().subscribe(trips => {
      this.pendingTrips = trips;
    });
  }

  calculateTotalAmount(trip: Trip): number {
    return trip.expenses.reduce((total, exp) => total + exp.totalPrice, 0);
  }

}
