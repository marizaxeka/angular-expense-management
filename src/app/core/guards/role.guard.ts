import { inject } from "@angular/core";
import { CanActivateFn,Router } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "../services/auth.service";

export const RoleGuard: CanActivateFn = (route) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const allowedRoles = route.data['roles'] as string[];
    return authService.currentUser$.pipe(
      map(user => {
        if (!user || !allowedRoles.includes(user.role)) {
          router.navigate(['/403']);
          return false;
        }
        return true;
      })
    );
  };                                                                                                                                                                                         