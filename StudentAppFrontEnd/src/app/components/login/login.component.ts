import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response && response.status === 'success') {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.message || 'Login failed';
        }
      },
      (error) => {
        this.errorMessage = error.message || 'Something went wrong';
      }
    );
  }
}
