import { TripStatus } from "../../core/enums/trip-status.enum";
import { Trip } from "../../core/interfaces/trip.interface";


export const MOCK_TRIPS: Trip[] = [
  {
    id: '1',
    name: 'Business Trip to New York',
    duration: 5,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-05'),
    status: TripStatus.DRAFT,
    userId: '1',
    expenses: []
  },
  {
    id: '2',
    name: 'Conference in San Francisco',
    duration: 3,
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-18'),
    status: TripStatus.PENDING,
    userId: '1',
    expenses: []
  },
  {
    id: '3',
    name: 'Tech Summit in London',
    duration: 7,
    startDate: new Date('2024-04-10'),
    endDate: new Date('2024-04-17'),
    status: TripStatus.APPROVED,
    userId: '1',
    expenses: []
  }
];