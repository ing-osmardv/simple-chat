import { Component, inject, OnInit } from '@angular/core';
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
export class ChatComponent implements OnInit {

  // spiService = inject(User);
  users = [];

  selectedUser: any = null;
  newMessage: string = '';

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // getUsers()
  selectUser(user: any) {
    this.selectedUser = user;
  }

  sendMessage() {
    if (this.selectedUser && this.newMessage.trim()) {
      this.selectedUser.messages.push({ sender: 'Me', content: this.newMessage });
      this.newMessage = '';
    }
  }
}
