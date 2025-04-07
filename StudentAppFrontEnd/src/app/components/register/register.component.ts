import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Call the AuthService register function
    this.authService.register(this.name, this.email, this.password).subscribe(
      (response: any) => {
        // If the registration is successful
        console.log('Registration successful:', response);
        if (response && response.status === 'success') {
          // Navigate to login after successful registration
          this.router.navigate(['/login']);
        } else {
          // If there's an issue with the response, show a generic error
          this.errorMessage = 'Registration failed. Try again later.';
        }
      },
      (error: any) => {
        // Handle errors from the HTTP request
        console.error('Registration error:', error);
        if (error.error && error.error.message) {
          // Display specific error message from backend
          this.errorMessage = error.error.message;
        } else {
          // If no specific error, show a general failure message
          this.errorMessage = 'Registration failed. Try again later.';
        }
      }
    );
  }
}
