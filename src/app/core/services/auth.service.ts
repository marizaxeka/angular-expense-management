import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { UserRole } from '../enums/user-role.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  set currentUser(user: User | null) {
    this.currentUserSubject.next(user);
  }

  private mockUsers: User[] = [
    {
      id: '1',
      email: 'user@example.com',
      password: 'user123',
      role: UserRole.END_USER,
      name: 'John Doe',
    },
    {
      id: '2',
      email: 'approver@example.com',
      password: 'approver123',
      role: UserRole.APPROVER,
      name: 'Jane Smith',
    },
    {
      id: '3',
      email: 'finance@example.com',
      password: 'finance123',
      role: UserRole.FINANCE,
      name: 'Mike Johnson',
    },
  ];

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    const user = this.mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      return throwError(() => new Error('Invalid credentials'));
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return of(user);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['']);
  }
}
