import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

export interface UserDetails {
  id: number;
  username: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly API_URL = `${environment.apiBaseUrl}/auth`;
  user = {username: '', password: '', email: ''};
  private authStatus =  new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string}) {
    return this.http.post<{token : string}>(`${this.API_URL}/login`, credentials);
  }

  register(user: {username: string; password: string; email: string}) {
    return this.http.post<UserDetails>(`${this.API_URL}/register`, user);
  }

  logout() {
    localStorage.removeItem('token'); 
    localStorage.removeItem('username'); 
    localStorage.removeItem('email');
  
    this.authStatus.next(false);
  }

  getToken() : string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setAuthStatus(status: boolean) {
    this.authStatus.next(status);
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }
}
