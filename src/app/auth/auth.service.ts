import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Using Angular Signals to track login state
  isAuthenticated = signal<boolean>(false);

  constructor(private router: Router) {
    // Check if the user session persists in localStorage
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      this.isAuthenticated.set(true);
    }
  }

  login(username: string, password: string): boolean {
    // Dummy hardcoded credentials validation
    if (username === 'admin' && password === 'password123') {
      localStorage.setItem('isLoggedIn', 'true');
      this.isAuthenticated.set(true);
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
