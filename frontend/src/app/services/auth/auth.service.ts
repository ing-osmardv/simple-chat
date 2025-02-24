import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'authToken';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  register(name: string, username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { name, username, email, password });
  }

  logout() {
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