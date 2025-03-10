import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../../core/services/trip.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [    
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatCardModule],
  templateUrl: './trip-form.component.html',
  styleUrl: './trip-form.component.scss'
})
export class TripFormComponent {
  tripForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.tripForm = this.fb.group({
      name: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.tripForm.valid) {
      const { startDate, endDate } = this.tripForm.value;
      const duration = this.calculateDuration(startDate!, endDate!);
      this.tripService
        .createTrip({
          ...this.tripForm.value,
          duration,
          status: 'DRAFT',
          expenses: [],
        })
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.snackBar.open('Trip created successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
            });
            this.router.navigate(['/trips']);
          }
        });
    }
  }

  private calculateDuration(start: Date, end: Date): number {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  cancel(){
    this.tripForm.reset()
  }
}
