import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent {

  credentials = { username: ' ', password: ''};
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials)
    .subscribe({
      next: (response) => {
        console.log('API response', response); 
        if(response && response.token) { 
          localStorage.setItem('token', response.token);
          this.authService.setAuthStatus(true);
          this.router.navigate(['/todos']);
        } else {
          console.error('No token found in response');
          this.errorMessage = 'Login failed. Please try again.';
        }
      },
      error: (error) => {
        console.error('API error', error); 
        this.errorMessage = 'Invalid username or password.';
      }
    });
}

}
