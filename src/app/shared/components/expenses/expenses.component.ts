import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterByTypePipe } from '../../pipes/filter-by-type.pipe';
import { ExpenseType } from '../../../core/enums/expense-type.enum';
import { Expense, Trip } from '../../../core/interfaces/trip.interface';
import { UserRole } from '../../../core/enums/user-role.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApprovalNote } from '../../../core/interfaces/approval-note.interface';
import { ApprovalService } from '../../../core/services/approval.service';
import { TripService } from '../../../core/services/trip.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../core/services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { Approval } from '../../../core/interfaces/approval.interface';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FilterByTypePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
  UserRole = UserRole;
  currentUser$ = inject(AuthService).currentUser$;
  @Input() approval?: Approval;
  @Input() expenses: Expense[] = [];
  @Input() isDraft = false;
  @Input() isPending = false;
  @Output() addExpense = new EventEmitter<void>();
  @Output() editExpense = new EventEmitter<Expense>();
  @Output() deleteExpense = new EventEmitter<Expense>();

  @Input() userRole!: UserRole;
  trip?: Trip;
  ExpenseType = ExpenseType;
  noteForm: FormGroup;
  note: any;

  constructor(
    private fb: FormBuilder,
    private approvalService: ApprovalService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.noteForm = this.fb.group({
      note: [''],
    });
    this.approvalService
      .getApproval(this.route.snapshot.params['id'])
      .subscribe((approval) => {
        if (approval?.note) {
          this.noteForm.patchValue({ note: approval.note });
        }
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

  addNote(): void {
    if (this.noteForm.valid) {
      const tripId = this.route.snapshot.params['id'];
      const approvalNote: ApprovalNote = {
        tripId,
        note: this.noteForm.get('note')?.value,
      };
      this.approvalService
        .addNote(approvalNote)
        .pipe(take(1))
        .subscribe({
          next: (updatedApproval) => {
            this.approval = updatedApproval;
            this.noteForm.reset();
            this.snackBar.open('Note added successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
            });
          },
          error: (err) => {
            console.error('Error adding note:', err);
            this.snackBar.open(
              'Failed to add note. Please try again.',
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
