import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly tokenKey = 'authToken';
    private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) { }
  
    getMessages(partner: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/message/${partner}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
        },
      });
    }
  
    sendMessage(payload: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/message/`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
        },
      });
    }
}
