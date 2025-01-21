import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogData } from '../../../../core/interfaces/expense-type-dialog-data';
import { FlightExpense } from '../../../../core/interfaces/flight-expense.interface';

@Component({
  selector: 'app-flight-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
  templateUrl: './flight-form.component.html',
  styleUrl: './flight-form.component.scss',
})
export class FlightFormComponent {
  flightForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FlightFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = !!data.expense;
    this.flightForm = this.fb.group({
      airline: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      departureDateTime: [null, Validators.required],
      arrivalDateTime: [null, Validators.required],
      totalPrice: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.expense) {
      this.flightForm.patchValue({
        airline: (<FlightExpense>this.data.expense).airline,
        from: (<FlightExpense>this.data.expense).from,
        to: (<FlightExpense>this.data.expense).to,
        departureDateTime: (<FlightExpense>this.data.expense).departureDateTime,
        arrivalDateTime: (<FlightExpense>this.data.expense).arrivalDateTime,
        totalPrice: (<FlightExpense>this.data.expense).totalPrice,
      });
    }
  }

  get dialogTitle(): string {
    return this.isEditMode
      ? 'Edit Car Rental Expense'
      : 'Add Car Rental Expense';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Update' : 'Add Expense';
  }

  submit(): void {
    if (this.flightForm.valid) {
      this.dialogRef.close(this.flightForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
