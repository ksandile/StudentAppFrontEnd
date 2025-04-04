import { Component } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
  
    this.authService.register(this.name, this.email, this.password).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
        // Navigate to login or show success message
      },
      (error: any) => {
        this.errorMessage = 'Registration failed. Try again later.';
      }
    );
  }
  
}
