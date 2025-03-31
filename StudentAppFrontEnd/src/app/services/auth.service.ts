import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  login(email: string, password: string): Observable<any> {
    // Replace with actual backend API call
    if (email === 'student@example.com' && password === 'password123') {
      return of({ success: true });
    }
    return of({ success: false });
  }

  register(name: string, email: string, password: string): Observable<any> {
    // Replace with actual backend API call
    return of({ success: true });
  }
}
