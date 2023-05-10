import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket!: WebSocket;
  messageFromSocket!: any;
  apiUrl = environment.baseUrl;
  timeLoggedIn: number = 0;
  timeLoggedIn$ = new BehaviorSubject<number>(this.timeLoggedIn);

  constructor(private http: HttpClient) {}

  connectWebSocket(id: string) {
    this.getTimeLoggedIn(id).subscribe((data: any) => {
      console.log('TIME LOGGED IN ', data);
      this.timeLoggedIn = Number(data.value);
      this.socket = new WebSocket('ws://localhost:8080/');
      console.log('ID--> ', id);
      console.log('time number logged--> ', this.timeLoggedIn);
      setInterval(() => {
        this.timeLoggedIn += 30;
        this.timeLoggedIn$.next(this.timeLoggedIn);
        this.socket.send(
          JSON.stringify({
            id: id,
            time: this.timeLoggedIn,
          })
        );
      }, 10000);
    });
  }

  getTimeLoggedIn(id: string) {
    return this.http.post(this.apiUrl + 'get-time-logged-in', { id: id });
  }

  getDatabaseTimeLoggedIn() {
    return this.http.get(this.apiUrl + 'get-time-logged-in-database');
  }

  getRxjsTimeLoggedIn(): Observable<number> {
    return this.timeLoggedIn$;
  }
}
