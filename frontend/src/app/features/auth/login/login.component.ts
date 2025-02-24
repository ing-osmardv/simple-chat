import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth/auth.service';
import { SocketService } from '../../../services/socket/socket.service';
import { UserService } from '../../../services/user/user.service';
import { catchError, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  socket = inject(SocketService);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).pipe(
      switchMap((loginResponse) => {
        this.socket.welcome();
        return this.socket.onWelcome().pipe(
          switchMap((welcomeData) => {
            localStorage.setItem('authToken', loginResponse.data.token);
            return this.userService.join(welcomeData.id, welcomeData.socketId).pipe(
              tap(() => {
                this.router.navigate(['/chat']);
              })
            );
          })
        );
      }),
      catchError((err) => {
        return of(null);
      })
    ).subscribe();
  }
}
