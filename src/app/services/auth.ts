import { Injectable } from '@angular/core';
import { ApiClient } from '../api/api-client';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth {
  constructor(private api: ApiClient) {}

  login(username: string, password: string) {
    return this.api.post<any>('/auth/login', {
      username,
      password
    }).pipe(
      tap(res => localStorage.setItem('token', res.token))
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
