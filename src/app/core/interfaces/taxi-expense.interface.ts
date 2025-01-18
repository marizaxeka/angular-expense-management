import { ExpenseType } from "../enums/expense-type.enum";

export interface TaxiExpense {
  type: ExpenseType;
  from: string;
  to: string;
  dateTime: Date;
}