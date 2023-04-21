import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUsersAndClasses() {
    return this.http.get<any>(`${this.apiUrl}number-users-classes`);
  }

  getPublishedClasses() {
    return this.http.get<any>(`${this.apiUrl}published-classes`);
  }
}
