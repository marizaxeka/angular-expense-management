import { Injectable } from '@angular/core';
import { Observable, of, throwError, map } from 'rxjs';
import { MOCK_APPROVALS } from '../../shared/mock-data/approval.mock';
import { ApprovalNote } from '../interfaces/approval-note.interface';
import { Approval } from '../interfaces/approval.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApprovalService {
 private readonly STORAGE_KEY = 'approvals';
 private approvals: Approval[] = [];

 constructor(private authService:AuthService) {
   this.loadApprovals();
 }

 private loadApprovals(): void {
   const stored = localStorage.getItem(this.STORAGE_KEY);
   this.approvals = stored ? JSON.parse(stored) : [];
   localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.approvals));
 }

 private saveApprovals(): void {
   localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.approvals));
 }

addNote(approvalNote: ApprovalNote): Observable<Approval> {
  return this.authService.currentUser$.pipe(
    map(user => {
      const existingIndex = this.approvals.findIndex(a => a.tripId === approvalNote.tripId);
      const newApproval: Approval = {
        id: existingIndex >= 0 ? this.approvals[existingIndex].id : Date.now().toString(),
        tripId: approvalNote.tripId,
        approverId: user?.id!,
        note: approvalNote.note,
        timestamp: new Date()
      };
 
      if (existingIndex >= 0) {
        this.approvals[existingIndex] = newApproval;
      } else {
        this.approvals.push(newApproval);
      }
 
      this.saveApprovals();
      return newApproval;
    })
  );
}

 getApproval(tripId: string): Observable<Approval | undefined> {
   const approval = this.approvals.find(a => a.tripId === tripId);
   return of(approval);
 }
}
