import { Injectable, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiClient } from '../api/api-client';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth {

  private platformId = inject(PLATFORM_ID);

  constructor(private api: ApiClient) {}

  login(username: string, password: string) {
    return this.api.post<any>('/auth/login', {
      username,
      password
    }).pipe(
      tap(res => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false; // ✅ SSR-safe default
    }
    return !!localStorage.getItem('token');
  }
}
