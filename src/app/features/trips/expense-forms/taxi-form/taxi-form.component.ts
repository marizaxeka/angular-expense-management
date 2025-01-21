import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HotelFormComponent } from '../hotel-form/hotel-form.component';
import { DialogData } from '../../../../core/interfaces/expense-type-dialog-data';
import { TaxiExpense } from '../../../../core/interfaces/taxi-expense.interface';

@Component({
  selector: 'app-taxi-form',
  standalone: true,
  imports: [   
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule],
  templateUrl: './taxi-form.component.html',
  styleUrl: './taxi-form.component.scss'
})
export class TaxiFormComponent {
  taxiForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaxiFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData
  ) {
    this.isEditMode = !!data.expense;
    this.taxiForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      dateTime: [null, Validators.required],
      totalPrice: [0, [Validators.required, Validators.min(0)]]
    });
  }

   ngOnInit(): void {
     if (this.isEditMode && this.data.expense) {
       this.taxiForm.patchValue({
         from: (<TaxiExpense>this.data.expense).from,
         to: (<TaxiExpense>this.data.expense).to,
         dateTime: (<TaxiExpense>this.data.expense).dateTime,
         totalPrice: (<TaxiExpense>this.data.expense).totalPrice,
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
    if (this.taxiForm.valid) {
      this.dialogRef.close(this.taxiForm.value);
    }
  }


  cancel(): void {
    this.dialogRef.close();
  }
}
