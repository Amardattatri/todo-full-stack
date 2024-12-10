import { Component } from '@angular/core';
import { LoginComponentComponent } from './auth/login-component/login-component.component';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'to-do';

  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = !!this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
