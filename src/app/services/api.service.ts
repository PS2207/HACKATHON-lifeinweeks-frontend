import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//for production :automatically will be eplaced with .prod.ts file don't need to import .prod here
import { environment } from '../../environments/environment'; //for development

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //private userBaseUrl = 'http://localhost:8081/api/user';
  //private eventBaseUrl = 'http://localhost:8081/api/event';
//For more flexibility while deploying -> create folder 'src/environment' within this -> 2 files '.ts & .prod.ts' & put url there then use this
  private userBaseUrl = `${environment.apiUrl}/user`
  private eventBaseUrl = `${environment.apiUrl}/event`

  constructor(private http: HttpClient) {}

  // 🔹 USER APIs

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.userBaseUrl}/login`, credentials);
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.userBaseUrl}/register`, data);
  }

  // 🔹 EVENT APIs

  createEvent(userId: number, eventData: any): Observable<any> {
    return this.http.post(`${this.eventBaseUrl}/user/${userId}/create`, eventData);
  }

  getAllEvents(userId: number): Observable<any> {
    return this.http.get(`${this.eventBaseUrl}/user/${userId}/getAll`);
  }

  updateEvent(eventId: number, eventData: any): Observable<any> {
    return this.http.put(`${this.eventBaseUrl}/${eventId}`, eventData);
  }

  deleteEvent(userId: number, eventId: number): Observable<any> {
    return this.http.delete(`${this.eventBaseUrl}/user/${userId}/${eventId}/delete`,
    {responseType: 'text' as 'json'}
  )
 }

}