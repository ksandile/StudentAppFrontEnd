import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'; // ✅ You forgot catchError here!

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:80/StudentAppBackEnd/registerStudent.cfm';

  constructor(private _http: HttpClient) {}

  register(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data, httpOptions).pipe(
      map((res: any) => {
        console.log('🧪 Raw response:', res);

        if (typeof res === 'string') {
          try {
            res = JSON.parse(res);
          } catch (e) {
            console.error('❌ JSON parsing failed:', e);
            throw new Error('Invalid JSON format from server.');
          }
        }

        const status = (res.STATUS || res.status || '').toLowerCase();
        const message = res.MESSAGE || res.message || '';

        if (status === 'success') {
          console.log('✅ Registration successful');
          return res;
        } else {
          console.error('❌ Registration failed:', message);
          throw new Error(message || 'Registration failed');
        }
      }),
      catchError((error) => {
        console.error('💥 Caught error in service:', error);
        return throwError(() => error);
      })
    );
  }

}
