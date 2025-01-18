import { TripStatus } from "../enums/trip-status.enum";

export interface ApprovalAction {
  id: string;
  tripId: string;
  approverId: string;
  status: TripStatus;
  note?: string;
  timestamp: Date;
}