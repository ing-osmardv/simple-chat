import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket = io(environment.apiUrl);

  constructor() { }

  join(): void {
    this.socket.emit('join');
  }

  onJoin(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('join', (data) => {
        observer.next(data);
      });
    });
  }

}