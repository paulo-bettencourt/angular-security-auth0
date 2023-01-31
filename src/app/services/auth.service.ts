import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user.interface";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  login() {
    return this.http.post<User>(this.apiUrl + `login`, '')
  }

}
