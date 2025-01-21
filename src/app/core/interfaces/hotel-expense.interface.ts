import { ExpenseType } from "../enums/expense-type.enum";

export interface HotelExpense {
    id: string;
    tripId: string;
    type: ExpenseType.HOTEL;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    hotelName: string;
    location: string;
    checkInDate: Date;
    checkoutDate: Date;
}