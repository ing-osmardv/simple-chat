import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';
import { SocketService } from '../socket/socket.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'authToken';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private socketService: SocketService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  register(payload: { email: string, name: string, username: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, payload);
  }

  logout() {
    this.userService.updateStatus(false).subscribe(() => {
      this.socketService.join();
    });
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUsername(): string {
    return localStorage.getItem('username') || 'Anónimo';
  }
}