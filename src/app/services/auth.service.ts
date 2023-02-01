import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user.interface";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl: string = environment.baseUrl;
  public isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  login(data: User) {
    return this.http.post<User>(this.apiUrl + `login`, data);
  }

  signup(data: User) {
    return this.http.post<User>(this.apiUrl + `signup`, data);
  }

  otp(data: any) {
    return this.http.post<User>(this.apiUrl + `otp`, data);
  }

  uploadFile(data: File) {
    const formData: FormData = new FormData();
    formData.append('file', data);
    return this.http.post(this.apiUrl + `upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    })
  }

  uploadImage(data: File) {
    const formData: FormData = new FormData();
    formData.append('image', data);
    return this.http.post(this.apiUrl + `upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    })
  }

  set isLogged(value: boolean) {
    this.isLogged$.next(value);
  }

  get isLoggedGetter() {
    return this.isLogged$;
  }

}





