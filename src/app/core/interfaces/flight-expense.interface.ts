import { ExpenseType } from "../enums/expense-type.enum";

export interface FlightExpense  {
  type: ExpenseType;
  airline: string;
  from: string;
  to: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
}