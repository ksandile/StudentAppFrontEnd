import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  sName = '';
  sEmail = '';
  sPassword = '';
  confirmPassword = '';
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.sPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      this.successMessage = '';
      return;
    }

    const studentData = {
      sName: this.sName,
      sEmail: this.sEmail,
      sPassword: this.sPassword
    };

    this.authService.register(studentData).subscribe({
      next: (res) => {
        if (res.STATUS === 'success') {
          this.successMessage = res.MESSAGE;
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        } else {
          this.errorMessage = res.MESSAGE;
          this.successMessage = '';
        }
      },
      error: (err) => {
        console.error('[Register] error:', err);
        this.successMessage = '';
        this.errorMessage = err.MESSAGE || 'Registration failed.';
      }
    });
  }
}
