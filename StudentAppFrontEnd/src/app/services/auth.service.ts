import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_ENDPOINT = 'http://localhost/StudentBackEnd/api/login.cfm';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('sEmail', email);
    body.set('sPassword', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.API_ENDPOINT, body.toString(), { headers }).pipe(
      map((response: any) => {
        if (response.status === 'success') {
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
      sFunction: 'registerStudent',
      sName: name,
      sEmail: email,
      sPassword: password
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post('http://localhost/StudentBackEnd/api/register.cfm', body, { headers }).pipe(
      map((response: any) => response),
      tap(res => console.log('[Register] response:', res)),
      catchError((error: any) => {
        console.error('[Register] error:', error);
        return throwError(() => error);
      })
    );
  }
  
}
