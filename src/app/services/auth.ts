import { Injectable, inject, signal } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiClient } from '../api/api-client';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth {

  private platformId = inject(PLATFORM_ID);

  // 🔥 THIS is the reactive source
  private _isLoggedIn = signal(false);

  constructor(private api: ApiClient) {
    // restore state on refresh
    if (isPlatformBrowser(this.platformId)) {
      this._isLoggedIn.set(!!localStorage.getItem('token'));
    }
  }

  login(username: string, password: string) {
    return this.api.post<any>('/auth/login', { username, password }).pipe(
      tap(res => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.token);
        }
        this._isLoggedIn.set(true); // ✅ trigger UI
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this._isLoggedIn.set(false); // ✅ trigger UI
  }

  // expose read-only state
  isLoggedIn() {
    return this._isLoggedIn();
  }
}
