import { ExpenseType } from "../enums/expense-type.enum";

export interface CarRentalExpense {
    id: string;
    tripId: string;
    type: ExpenseType;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}