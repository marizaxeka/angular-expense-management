import { TripStatus } from '../../core/enums/trip-status.enum';
import { Approval } from '../../core/interfaces/approval.interface';

export const MOCK_APPROVALS: Approval[] = [
  {
    id: '1',
    tripId: '1',
    approverId: '2', 
    status: TripStatus.PENDING,
    note: 'Please review travel dates',
    timestamp: new Date('2024-01-20')
  },
];