import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Expense, Trip } from '../interfaces/trip.interface';
import { TripStatus } from '../enums/trip-status.enum';
import { MOCK_TRIPS } from '../../shared/mock-data/trips.mock';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private trips: Trip[] = MOCK_TRIPS;

  constructor() {}

  getTrips(): Observable<Trip[]> {
    return of(this.trips);
  }

  getTrip(id: string): Observable<Trip | undefined> {
    return of(this.trips.find((trip) => trip.id === id));
  }

  createTrip(tripData: Omit<Trip, 'id' | 'expenses'>): Observable<Trip> {
    const newTrip: Trip = {
      ...tripData,
      id: Date.now().toString(),
      expenses: [],
    };

    this.trips.push(newTrip);
    return of(newTrip);
  }

  addExpense(
    tripId: string,
    expenseData: Omit<Expense, 'id' | 'tripId'>
  ): Observable<Trip> {
    const tripIndex = this.trips.findIndex((t) => t.id === tripId);
    if (tripIndex === -1) throw new Error('Trip not found');
    const trip = this.trips[tripIndex];
    if (trip.status !== TripStatus.DRAFT) {
      throw new Error(
        'Cannot add expenses to a trip that is not in DRAFT status'
      );
    }

    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      tripId,
    } as Expense;

    this.trips[tripIndex] = {
      ...trip,
      expenses: [...trip.expenses, newExpense],
    };

    return of(this.trips[tripIndex]);
  }

  updateExpense(
    tripId: string,
    expenseId: string,
    updates: Partial<Omit<Expense, 'id' | 'tripId' | 'type'>>
  ): Observable<Trip> {
    const tripIndex = this.trips.findIndex((t) => t.id === tripId);
    if (tripIndex === -1) throw new Error('Trip not found');

    const trip = this.trips[tripIndex];
    if (trip.status !== TripStatus.DRAFT) {
      throw new Error(
        'Cannot update expenses of a trip that is not in DRAFT status'
      );
    }

    const updatedExpenses = trip.expenses.map((expense) =>
      expense.id === expenseId
        ? ({ ...expense, ...updates } as Expense)
        : expense
    );

    this.trips[tripIndex] = {
      ...trip,
      expenses: updatedExpenses,
    };

    return of(this.trips[tripIndex]);
  }
  deleteExpense(tripId: string, expenseId: string): Observable<Trip> {
    const tripIndex = this.trips.findIndex((t) => t.id === tripId);
    if (tripIndex === -1) throw new Error('Trip not found');

    const trip = this.trips[tripIndex];
    if (trip.status !== TripStatus.DRAFT) {
      throw new Error(
        'Cannot delete expenses from a trip that is not in DRAFT status'
      );
    }

    const updatedExpenses = trip.expenses.filter(
      (expense) => expense.id !== expenseId
    );
    this.trips[tripIndex] = {
      ...trip,
      expenses: updatedExpenses,
    };

    return of(this.trips[tripIndex]);
  }

  updateTripStatus(id: string, status: TripStatus): Observable<Trip> {
    const tripIndex = this.trips.findIndex((trip) => trip.id === id);
    if (tripIndex === -1) throw new Error('Trip not found');

    this.trips[tripIndex] = {
      ...this.trips[tripIndex],
      status,
    };

    return of(this.trips[tripIndex]);
  }

  getPendingTrips(): Observable<Trip[]> {
    return of(this.trips.filter((trip) => trip.status === TripStatus.PENDING));
  }

  getApprovedTrips(): Observable<Trip[]> {
    return of(this.trips.filter((trip) => trip.status === TripStatus.APPROVED));
  }
}
