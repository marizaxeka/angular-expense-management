import { ExpenseType } from "../enums/expense-type.enum";

export interface CarRentalExpense {
  id: string;
  tripId: string;
  type: ExpenseType.CAR_RENTAL;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  carName: string;
  pickupDateTime: Date;
  dropoffDateTime: Date;
  pickupLocation: string;
  dropoffLocation: string;
}