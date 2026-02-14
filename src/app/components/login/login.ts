import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  @Output() closed = new EventEmitter<boolean>();

  constructor(private auth: Auth) {}

  login(email: string, password: string) {
    this.auth.login(email, password).subscribe({
      next: () => this.closed.emit(true),
      error: () => alert('Invalid email or password')
    });
  }

  close() {
    this.closed.emit(false);
  }
}
