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
  
    getUsers(): Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/register`, {});
    }
}
