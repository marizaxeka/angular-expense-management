import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { Expense, Trip } from '../interfaces/trip.interface';
import { TripStatus } from '../enums/trip-status.enum';
import { MOCK_TRIPS } from '../../shared/mock-data/trips.mock';
import { RefundStatus } from '../enums/refund-status.enum';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private readonly STORAGE_KEY = 'trips';
  private trips: Trip[] = [];
  private storageSub = new Subject<void>();
  private bc = new BroadcastChannel('test_channel');
  constructor() {
    this.loadTrips();
    this.bc.onmessage = (ev) => {
      this.getTrips();
    };
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  private loadTrips(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.trips = stored ? JSON.parse(stored) : MOCK_TRIPS;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.trips));
  }

  private saveTrips(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.trips));
  }

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
    this.saveTrips();
    this.bc.postMessage('This is a test message.');

    return of(newTrip);
  }

  addExpense(
    tripId: string,
    expenseData: Omit<Expense, 'id' | 'tripId'>
  ): Observable<Trip> {
    const tripIndex = this.trips.findIndex((t) => t.id === tripId);
    if (tripIndex === -1) return throwError(() => new Error('Trip not found'));

    const trip = this.trips[tripIndex];
    if (trip.status !== TripStatus.DRAFT) {
      return throwError(
        () => new Error('Cannot add expenses to a non-draft trip')
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
    this.saveTrips();
    return of(this.trips[tripIndex]);
  }

  updateExpense(
    tripId: string,
    expenseId: string,
    updates: Partial<Omit<Expense, 'id' | 'tripId' | 'type'>>
  ): Observable<Trip> {
    const tripIndex = this.trips.findIndex((t) => t.id === tripId);
    if (tripIndex === -1) return throwError(() => new Error('Trip not found'));

    const trip = this.trips[tripIndex];
    if (trip.status !== TripStatus.DRAFT) {
      return throwError(
        () => new Error('Cannot update expenses of a non-draft trip')
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
    this.saveTrips();
    return of(this.trips[tripIndex]);
  }

  deleteExpense(tripId: string, expenseId: string): Observable<Trip> {
    const tripIndex = this.trips.findIndex((t) => t.id === tripId);
    if (tripIndex === -1) return throwError(() => new Error('Trip not found'));

    const trip = this.trips[tripIndex];
    if (trip.status !== TripStatus.DRAFT) {
      return throwError(
        () => new Error('Cannot delete expenses from a non-draft trip')
      );
    }

    this.trips[tripIndex] = {
      ...trip,
      expenses: trip.expenses.filter((e) => e.id !== expenseId),
    };
    this.saveTrips();
    return of(this.trips[tripIndex]);
  }

  updateTripStatus(id: string, status: TripStatus): Observable<Trip> {
    const tripIndex = this.trips.findIndex((trip) => trip.id === id);
    if (tripIndex === -1) return throwError(() => new Error('Trip not found'));

    this.trips[tripIndex] = {
      ...this.trips[tripIndex],
      status,
    };
    this.saveTrips();
    return of(this.trips[tripIndex]);
  }

  getPendingTrips(): Observable<Trip[]> {
    return of(this.trips.filter((trip) => trip.status === TripStatus.PENDING));
  }

  getApprovedTrips(): Observable<Trip[]> {
    return of(this.trips.filter((trip) => trip.status === TripStatus.APPROVED));
  }

  updateRefundStatus(tripId: string, status: RefundStatus): Observable<Trip> {
    const tripIndex = this.trips.findIndex((t) => t.id === tripId);
    if (tripIndex === -1) return throwError(() => new Error('Trip not found'));

    this.trips[tripIndex] = {
      ...this.trips[tripIndex],
      refundStatus: status,
      lastUpdated: new Date(),
    };
    this.saveTrips();
    return of(this.trips[tripIndex]);
  }
}
