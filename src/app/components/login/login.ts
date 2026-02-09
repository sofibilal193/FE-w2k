import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  login(username: string, password: string) {
    this.auth.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: () => {
        alert('Invalid username or password');
      }
    });
  }
}
