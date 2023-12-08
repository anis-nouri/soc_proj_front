import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'your_backend_api_url';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/users`);
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/users/${username}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/api/users`, user);
  }

  updateUser(username: string, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/api/users/${username}`, updatedUser);
  }

  deleteUser(username: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/users/${username}`);
  }
}