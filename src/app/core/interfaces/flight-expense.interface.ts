import { ExpenseType } from "../enums/expense-type.enum";

export interface FlightExpense  {
  id: string;
  tripId: string;
  type: ExpenseType.FLIGHT;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  airline: string;
  from: string;
  to: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
}