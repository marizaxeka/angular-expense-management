import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogData } from '../../../../core/interfaces/expense-type-dialog-data';
import { CarRentalExpense } from '../../../../core/interfaces/car-rental-expense.enum';

@Component({
  selector: 'app-car-rental-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './car-rental-form.component.html',
  styleUrl: './car-rental-form.component.scss',
})
export class CarRentalFormComponent {
  carRentalForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CarRentalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = !!data.expense;
    this.carRentalForm = this.fb.group({
      carName: ['', Validators.required],
      pickupDateTime: [null, Validators.required],
      dropoffDateTime: [null, Validators.required],
      pickupLocation: ['', Validators.required],
      dropoffLocation: ['', Validators.required],
      totalPrice: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.expense) {
      this.carRentalForm.patchValue({
        carName: (<CarRentalExpense>this.data.expense).carName,
        pickupDateTime: new Date(
          (<CarRentalExpense>this.data.expense).pickupDateTime
        ),
        dropoffDateTime: new Date(
          (<CarRentalExpense>this.data.expense).dropoffDateTime
        ),
        pickupLocation: (<CarRentalExpense>this.data.expense).pickupLocation,
        dropoffLocation: (<CarRentalExpense>this.data.expense).dropoffLocation,
        totalPrice: (<CarRentalExpense>this.data.expense).totalPrice,
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
    if (this.carRentalForm.valid) {
      this.dialogRef.close(this.carRentalForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
