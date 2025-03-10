import { RefundStatus } from "../enums/refund-status.enum";
import { TripStatus } from "../enums/trip-status.enum";
import { CarRentalExpense } from "./car-rental-expense.enum";
import { FlightExpense } from "./flight-expense.interface";
import { HotelExpense } from "./hotel-expense.interface";
import { TaxiExpense } from "./taxi-expense.interface";

export interface Trip {
  id: string;
  name: string;
  duration: number;
  startDate: Date;
  endDate: Date;
  userId: string;
  status: TripStatus;
  expenses: Expense[];
  refundStatus?: RefundStatus;
  note?: string;
  approverId?: string; 
  lastUpdated?: Date;

}
export type Expense = CarRentalExpense | HotelExpense | FlightExpense | TaxiExpense;
