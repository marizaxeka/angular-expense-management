import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CarRentalFormComponent } from '../car-rental-form/car-rental-form.component';
import { DialogData } from '../../../../core/interfaces/expense-type-dialog-data';
import { HotelExpense } from '../../../../core/interfaces/hotel-expense.interface';

@Component({
  selector: 'app-hotel-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule],
  templateUrl: './hotel-form.component.html',
  styleUrl: './hotel-form.component.scss'
})
export class HotelFormComponent {
  hotelForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HotelFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = !!data.expense;
    this.hotelForm = this.fb.group({
      hotelName: ['', Validators.required],
      location: ['', Validators.required],
      checkInDate: [null, Validators.required],
      checkoutDate: [null, Validators.required],
      totalPrice: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.expense) {
      this.hotelForm.patchValue({
        hotelName: (<HotelExpense>this.data.expense).hotelName,
        location: (<HotelExpense>this.data.expense).location,
        checkInDate: (<HotelExpense>this.data.expense).checkInDate,
        checkoutDate: (<HotelExpense>this.data.expense).checkoutDate,
        totalPrice: (<HotelExpense>this.data.expense).totalPrice,
      });
    }
  }


  submit(): void {
    if (this.hotelForm.valid) {
      this.dialogRef.close(this.hotelForm.value);
    }
  }


  get dialogTitle(): string {
    return this.isEditMode
      ? 'Edit Hotel Expense'
      : 'Add Hotel Rental Expense';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Update' : 'Add Expense';
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
