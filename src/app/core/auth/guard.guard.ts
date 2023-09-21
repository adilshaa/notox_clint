import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Check if the user is authenticated (e.g., by checking if a token exists in localStorage)
    const isAuthenticated = !!localStorage.getItem('token');

    if (isAuthenticated) {
      // User is authenticated, allow access to the route
      return true;
    } else {
      // User is not authenticated, redirect to the signin page
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
