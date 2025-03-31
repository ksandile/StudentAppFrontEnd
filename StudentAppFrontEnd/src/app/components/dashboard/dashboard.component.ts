import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  courses = [
    { name: 'Course 1', status: 'Pending' },
    { name: 'Course 2', status: 'Accepted' }
  ];
}
