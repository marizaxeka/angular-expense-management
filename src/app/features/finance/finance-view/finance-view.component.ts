import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Trip } from '../../../core/interfaces/trip.interface';
import { TripService } from '../../../core/services/trip.service';
import { RefundStatus } from '../../../core/enums/refund-status.enum';
import { MatTooltipModule } from '@angular/material/tooltip';
import { tap } from 'rxjs';

@Component({
  selector: 'app-finance-view',
  standalone: true,
  imports: [    
      CommonModule,
      RouterModule,
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatTooltipModule
      
    ],
  templateUrl: './finance-view.component.html',
  styleUrl: './finance-view.component.scss'
})
export class FinanceViewComponent {
  approvedTrips: Trip[] = [];
 displayedColumns = ['name', 'user', 'dates', 'totalAmount', 'actions'];
 RefundStatus = RefundStatus;

 constructor(private tripService: TripService) {}

 ngOnInit(): void {
   this.tripService.getApprovedTrips().subscribe(trips => {
     this.approvedTrips = trips;
   });
 }

 calculateTotalAmount(trip: Trip): number {
   return trip.expenses.reduce((total, exp) => total + exp.totalPrice, 0);
 }

 updateStatus(trip: Trip, status: RefundStatus): void {
  this.tripService.updateRefundStatus(trip.id, status)
    .pipe(
      tap(updatedTrip => {
        const index = this.approvedTrips.findIndex(t => t.id === trip.id);
        if (index !== -1) {
          this.approvedTrips[index] = updatedTrip;
        }
        this.approvedTrips = [...this.approvedTrips];
      })
    )
    .subscribe();
 }

 getStatusClass(status: RefundStatus): string {
  return status === RefundStatus.IN_PROCESS ? 'text-orange-500' : 'text-green-500';
 }
 
 getStatusIcon(status: RefundStatus): string {
  return status === RefundStatus.IN_PROCESS ? 'pending' : 'done_all';
 }
}
