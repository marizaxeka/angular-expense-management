import { Component } from '@angular/core';
import { ExpenseType } from '../../../../core/enums/expense-type.enum';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-expense-type-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatNativeDateModule],
  templateUrl: './add-expense-type-dialog.component.html',
  styleUrl: './add-expense-type-dialog.component.scss'
})
export class AddExpenseTypeDialogComponent {
  expenseTypes = Object.values(ExpenseType);

  constructor(private dialogRef: MatDialogRef<AddExpenseTypeDialogComponent>) {}

  selectType(type: ExpenseType): void {
    this.dialogRef.close(type);
  }

  getIconForType(type: ExpenseType): string {
    switch (type) {
      case ExpenseType.CAR_RENTAL: return 'directions_car';
      case ExpenseType.HOTEL: return 'hotel';
      case ExpenseType.FLIGHT: return 'flight';
      case ExpenseType.TAXI: return 'local_taxi';
    }
  }
}
