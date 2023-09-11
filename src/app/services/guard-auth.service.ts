import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) {
      this.router.navigate(['/Login']);
      return false;
    }

    return true;
  }
}