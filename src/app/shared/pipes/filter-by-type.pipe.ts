// src/app/core/pipes/filter-by-type.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../../core/interfaces/trip.interface';
import { ExpenseType } from '../../core/enums/expense-type.enum';


@Pipe({
  name: 'filterByType',
  standalone: true
})
export class FilterByTypePipe implements PipeTransform {
  transform(expenses: Expense[] | undefined, type: ExpenseType): Expense[] {
    if (!expenses) return [];
    return expenses.filter(expense => expense.type === type);
  }
}