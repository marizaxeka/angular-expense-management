import { ExpenseType } from "../enums/expense-type.enum";

export interface TaxiExpense {
  id: string;
  tripId: string;
  type: ExpenseType.TAXI;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  from: string;
  to: string;
  dateTime: Date;
}