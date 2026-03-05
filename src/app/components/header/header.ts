import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { Login } from '../login/login';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, Login],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  showLogin = signal(false);

  constructor(private readonly auth: Auth) {}

  isLoggedIn = computed(() => this.auth.isLoggedIn());

  openLogin() {
    this.showLogin.set(true);
  }

  closeLogin(success: boolean) {
    this.showLogin.set(false);
  }

  logout() {
    this.auth.logout();
  }
}
