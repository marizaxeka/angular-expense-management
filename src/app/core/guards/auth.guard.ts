import { inject, Injectable } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
  export const AuthGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
  
    return authService.currentUser$.pipe(
      map(user => {
        if (!user) {
          router.navigate(['']);
          return false;
        }
        return true;
      })
    );
  };
  