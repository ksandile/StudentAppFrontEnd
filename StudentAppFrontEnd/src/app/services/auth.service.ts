import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_ENDPOINT = 'http://localhost/StudentAppBackEnd/api/login.cfm';
  private REGISTER_ENDPOINT = 'http://localhost/StudentAppBackEnd/registerStudent.cfm';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = {
      sEmail: email,
      sPassword: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.LOGIN_ENDPOINT, body, { headers }).pipe(
      map((response: any) => {
        if (response.status === 'success') {
          localStorage.setItem('token', response.token || 'true');
          return response;
        } else {
          throw new Error(response.message || 'Login failed');
        }
      }),
      tap(res => console.log('[Login] response:', res)),
      catchError(error => {
        console.error('[Login] error:', error);
        return throwError(() => error);
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    const body = {
      sName: name,
      sEmail: email,
      sPassword: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.REGISTER_ENDPOINT, body, { headers }).pipe(
      map((response: any) => {
        console.log('Server Response:', response); // Log server response for debugging
        if (response.status === 'success') {
          return response;
        } else {
          throw new Error(response.message || 'Registration failed');
        }
      }),
      catchError(error => {
        console.error('[Register] error:', error);
        if (error.error) {
          console.error('Error response body:', error.error); // Log the raw error response
        }
        return throwError(() => error);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
