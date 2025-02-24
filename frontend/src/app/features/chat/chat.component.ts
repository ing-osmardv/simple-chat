import { Component, inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user/user.service';
import { SocketService } from '../../services/socket/socket.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {

  userService = inject(UserService);
  socketService = inject(SocketService);
  messageService = inject(MessageService);
  users: any[] = [];
  messages: any[] = [];
  selectedUser: any = null;
  newMessage: string = '';

  ngOnInit(): void {
    this.getUsers();
    this.onNewJoin();
    this.socketService.join();

    window.addEventListener('beforeunload', this.onUnload);
  }

  ngOnDestroy(): void {
    this.setOfflineStatus();
    window.removeEventListener('beforeunload', this.onUnload);
  }

  @HostListener('window:beforeunload', ['$event'])
  onUnload(event: any) {
    this.setOfflineStatus();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.setOfflineStatus();
  }

  getUsers() {
    this.userService.getUsersRegistered().subscribe({
      next: (response) => {
        this.users = response;
      }
    });
  }

  onNewJoin() {
    this.socketService.onJoin().subscribe((data) => {
      if (data) {
        this.setOnlineStatus(data);
      } else {
        setTimeout(() => {
          this.getUsers();
        }, 1000);
      }
    });
  }

  setOnlineStatus(socketId: string) {
    this.userService.updateStatus(true, socketId).subscribe();
  }

  setOfflineStatus() {
    this.userService.updateStatus(false).subscribe();
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.messageService.getMessages(user.id).subscribe({
      next: (data) => {
        this.messages = data;
      }
    })
  }

  sendMessage() {
    if (!this.selectedUser || !this.newMessage.trim()) {
      return;
    }
  
    const messageData = {
      receiver: this.selectedUser.id,
      text: this.newMessage.trim(),
      timestamp: new Date()
    };
  
    this.messageService.sendMessage(messageData).subscribe({
      next: (savedMessage) => {
        this.newMessage = '';
      },
      error: (err) => console.error('Error sending message:', err)
    });
  }

}
