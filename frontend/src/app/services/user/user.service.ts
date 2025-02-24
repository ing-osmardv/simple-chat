import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly tokenKey = 'authToken';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersRegistered(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/registered`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
      },
    });
  }

  join(id: number, socketId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/join`, { socketId }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
      },
    });
  }
}
