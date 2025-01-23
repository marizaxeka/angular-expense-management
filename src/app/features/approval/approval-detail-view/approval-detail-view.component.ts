import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { TripStatus } from '../../../core/enums/trip-status.enum';
import { Trip } from '../../../core/interfaces/trip.interface';
import { ApprovalService } from '../../../core/services/approval.service';
import { TripService } from '../../../core/services/trip.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ExpensesComponent } from '../../../shared/components/expenses/expenses.component';
import { UserRole } from '../../../core/enums/user-role.enum';
import { Approval } from '../../../core/interfaces/approval.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-approval-detail-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    ExpensesComponent,
  ],
  templateUrl: './approval-detail-view.component.html',
  styleUrl: './approval-detail-view.component.scss',
})
export class ApprovalDetailViewComponent {
  trip?: Trip;
  noteForm: FormGroup;
  note: any;
  TripStatus = TripStatus;
  userRole = UserRole.APPROVER;
  approval?: Approval;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private approvalService: ApprovalService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.noteForm = this.fb.group({
      note: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const tripId = this.route.snapshot.params['id'];
    this.tripService.getTrip(tripId).subscribe((trip) => {
      this.trip = trip;
    });
    this.approvalService.getApproval(tripId).subscribe(approval => {
      this.approval = approval;
    });
  }

  calculateTotalAmount(): number {
    return (
      this.trip?.expenses.reduce((total, exp) => total + exp.totalPrice, 0) ?? 0
    );
  }

  getExpenseIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      CAR_RENTAL: 'directions_car',
      HOTEL: 'hotel',
      FLIGHT: 'flight',
      TAXI: 'local_taxi',
    };
    return iconMap[type] || 'receipt';
  }

  getExpenseTitle(expense: any): string {
    switch (expense.type) {
      case 'CAR_RENTAL':
        return expense.carName;
      case 'HOTEL':
        return expense.hotelName;
      case 'FLIGHT':
        return `${expense.from} - ${expense.to}`;
      case 'TAXI':
        return `${expense.from} - ${expense.to}`;
      default:
        return 'Expense';
    }
  }

  approveTrip(): void {
    if (this.trip) {
      this.tripService
        .updateTripStatus(this.trip.id, TripStatus.APPROVED)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.snackBar.open('Trip approved successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
            });
            this.router.navigate(['/approvals']);
          },
          error: () => {
            this.snackBar.open(
              'Failed to approve trip. Please try again.',
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

  rejectTrip(): void {
    if (this.trip) {
      this.tripService
        .updateTripStatus(this.trip.id, TripStatus.REJECTED)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.snackBar.open('Trip rejected successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
            });
            this.router.navigate(['/approvals']);
          },
          error: () => {
            this.snackBar.open(
              'Failed to reject trip. Please try again.',
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
}
