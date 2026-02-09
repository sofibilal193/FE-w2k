import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../environments/api.config';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  constructor(private http: HttpClient) {}

  get<T>(url: string) {
    return this.http.get<T>(`${API_CONFIG.BASE_URL}${url}`);
  }

  post<T>(url: string, body: any) {
    return this.http.post<T>(`${API_CONFIG.BASE_URL}${url}`, body);
  }

  put<T>(url: string, body: any) {
    return this.http.put<T>(`${API_CONFIG.BASE_URL}${url}`, body);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(`${API_CONFIG.BASE_URL}${url}`);
  }
}
