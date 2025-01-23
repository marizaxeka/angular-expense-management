import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Expense, Trip } from '../../../core/interfaces/trip.interface';
import { TripStatus } from '../../../core/enums/trip-status.enum';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TripService } from '../../../core/services/trip.service';
import { ExpenseType } from '../../../core/enums/expense-type.enum';
import { AddExpenseTypeDialogComponent } from '../dialogs/add-expense-type-dialog/add-expense-type-dialog.component';
import { CarRentalFormComponent } from '../expense-forms/car-rental-form/car-rental-form.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HotelFormComponent } from '../expense-forms/hotel-form/hotel-form.component';
import { FlightFormComponent } from '../expense-forms/flight-form/flight-form.component';
import { TaxiFormComponent } from '../expense-forms/taxi-form/taxi-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ExpensesComponent } from '../../../shared/components/expenses/expenses.component';

@Component({
  selector: 'app-trip-detail-view',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    ExpensesComponent,
  ],
  templateUrl: './trip-detail-view.component.html',
  styleUrl: './trip-detail-view.component.scss',
})
export class TripDetailViewComponent implements OnInit {
  trip?: Trip;
  TripStatus = TripStatus;
  ExpenseType = ExpenseType;
  selectedType: ExpenseType | null = null;

  expenseTypes = Object.values(ExpenseType);
  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.params['id'];
    this.tripService.getTrip(tripId).subscribe((trip) => {
      this.trip = trip;
    });
  }

  getExpenseClass(type: ExpenseType): string {
    const classes = {
      [ExpenseType.CAR_RENTAL]: 'border-blue-500',
      [ExpenseType.HOTEL]: 'border-green-500',
      [ExpenseType.FLIGHT]: 'border-purple-500',
      [ExpenseType.TAXI]: 'border-yellow-500',
    };
    return classes[type] || '';
  }

  getExpenseIcon(type: ExpenseType): string {
    switch (type) {
      case ExpenseType.CAR_RENTAL:
        return 'directions_car';
      case ExpenseType.HOTEL:
        return 'hotel';
      case ExpenseType.FLIGHT:
        return 'flight';
      case ExpenseType.TAXI:
        return 'local_taxi';
      default:
        return 'receipt';
    }
  }

  getExpenseTitle(expense: any): string {
    switch (expense.type) {
      case ExpenseType.CAR_RENTAL:
        return expense.carName;
      case ExpenseType.HOTEL:
        return expense.hotelName;
      case ExpenseType.FLIGHT:
        return `${expense.from} - ${expense.to}`;
      case ExpenseType.TAXI:
        return `${expense.from} - ${expense.to}`;
      default:
        return 'Expense';
    }
  }

  openAddExpenseDialog(): void {
    const typeDialog = this.dialog.open(AddExpenseTypeDialogComponent);
    typeDialog.afterClosed().subscribe((type) => {
      if (!type) return;

      let dialogRef;
      switch (type) {
        case ExpenseType.CAR_RENTAL:
          dialogRef = this.dialog.open(CarRentalFormComponent, {
            data: { tripId: this.trip?.id },
          });
          break;
        case ExpenseType.HOTEL:
          dialogRef = this.dialog.open(HotelFormComponent, {
            data: { tripId: this.trip?.id },
          });
          break;
        case ExpenseType.FLIGHT:
          dialogRef = this.dialog.open(FlightFormComponent, {
            data: { tripId: this.trip?.id },
          });
          break;
        case ExpenseType.TAXI:
          dialogRef = this.dialog.open(TaxiFormComponent, {
            data: { tripId: this.trip?.id },
          });
          break;
      }

      dialogRef?.afterClosed().subscribe((expenseData) => {
        if (expenseData && this.trip) {
          this.tripService
            .addExpense(this.trip.id, {
              type,
              ...expenseData,
            })
            .subscribe((updatedTrip) => {
              this.trip = updatedTrip;
            });
        }
      });
    });
  }

  editExpense(expense: Expense): void {
    const dialogConfig = {
      data: {
        tripId: this.trip?.id,
        expense: expense,
      },
      width: '500px',
    };

    const componentMap: Record<ExpenseType, any> = {
      [ExpenseType.CAR_RENTAL]: CarRentalFormComponent,
      [ExpenseType.HOTEL]: HotelFormComponent,
      [ExpenseType.FLIGHT]: FlightFormComponent,
      [ExpenseType.TAXI]: TaxiFormComponent,
    };

    if (!componentMap[expense.type]) return;
    const dialogRef = this.dialog.open(
      componentMap[expense.type],
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((updatedExpenseData) => {
      if (updatedExpenseData && this.trip) {
        this.tripService
          .updateExpense(this.trip.id, expense.id, {
            ...updatedExpenseData,
            type: expense.type,
          })
          .subscribe({
            next: (updatedTrip) => {
              this.trip = updatedTrip;
            },
            error: (error) => {
              console.error('Failed to update expense:', error);
            },
          });
      }
    });
  }

  deleteExpense(expense: any): void {
    if (confirm('Are you sure you want to delete this expense?') && this.trip) {
      this.tripService
        .deleteExpense(this.trip.id, expense.id)
        .subscribe((updatedTrip) => {
          this.trip = updatedTrip;
        });
    }
  }

  sendForApproval(): void {
    if (this.trip) {
      this.tripService
        .updateTripStatus(this.trip.id, TripStatus.PENDING)
        .subscribe((updatedTrip) => {
          this.trip = updatedTrip;
        });
    }
  }
}
