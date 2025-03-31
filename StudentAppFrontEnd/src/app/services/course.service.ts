import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor() {}

  getCourses(): Observable<any[]> {
    // Replace with actual backend API call
    return of([{ name: 'Course 1' }, { name: 'Course 2' }]);
  }
}
