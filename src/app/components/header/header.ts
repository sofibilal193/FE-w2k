import { Component, computed, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],   // ✅ THIS FIXES THE ERROR
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(
    private auth: Auth,
    private router: Router
  ) {}
  isLoggedIn = computed(() => this.auth.isLoggedIn());
    
  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
