import { TripStatus } from "../enums/trip-status.enum";
export interface Approval {
  id?: string;
  tripId?: string;
  approverId?: string;
  status?: TripStatus;
  note?: string;
  timestamp?: Date;
}