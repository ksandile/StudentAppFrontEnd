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
        console.log('🧪 Raw response from server:', res);
        let response = res;

        if (typeof res === 'string') {
          try {
            response = JSON.parse(res);
            console.log('✅ Parsed JSON:', response);
          } catch (e) {
            console.error('❌ Failed to parse JSON:', e);
            throw new Error('Invalid JSON response from server');
          }
        }

        const status = response?.STATUS;
        const normalized = status?.toString().trim().toLowerCase();

        console.log('🧪 STATUS:', status);
        console.log('🧪 Normalized STATUS:', normalized);

        if (normalized === 'success') {
          return response;
        } else {
          console.error('Registration failed on server:', response);
          throw new Error('Registration failed: ' + response.MESSAGE);
        }
      }),
      catchError((error) => {
        console.error('[Register] error:', error);
        return throwError(() => error); // You were missing this
      })
    );
  }
}
