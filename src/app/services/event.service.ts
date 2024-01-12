import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { evenement } from '../models/evenement.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<evenement[]> {
    return this.http.get<evenement[]>(`${this.apiUrl}/events`);
  }

  getEvent(id: number): Observable<evenement> {
    return this.http.get<evenement>(`${this.apiUrl}/events/${id}`);
  }

  createEvent(evenement: evenement, username: string): Observable<evenement> {
    const params = new HttpParams().set('username', username);
    return this.http.post<evenement>(`${this.apiUrl}/events`, evenement, { params });
  }

  updateEvent(id: number, updatedEvent: evenement): Observable<evenement> {
    return this.http.put<evenement>(`${this.apiUrl}/events/${id}`, updatedEvent);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/events/${id}`);
  }
}
