import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = { username: '', password: '', email: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private route: Router) { }

  register() {

    this.authService.register(this.user).subscribe({
      next: (response) => {
        localStorage.setItem("username", response.username);
        localStorage.setItem("email", response.email);
        this.route.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = "Registration failed. Try Again";
      }
    });
  }
}
