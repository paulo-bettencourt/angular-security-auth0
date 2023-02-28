import { Component } from '@angular/core';
import {FormBuilder, Validator, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../interfaces/user.interface";
import {Router} from "@angular/router";
import {MainPageComponent} from "../../../main-page/component/main-page/main-page.component";
import {reduxGermanService} from "../../../services/ngrx-german.service";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  })
  data!: User;
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private component: MainPageComponent, private reduxService: reduxGermanService) {
    /*this.loading$ = reduxService.loading$;*/
  }

  submit() {
    const buttonDisabled = document.getElementById('submitButtonLogin') as HTMLInputElement
    const login = this.form.controls['login'].value;
    const password = this.form.controls['password'].value;

    if(login && password && buttonDisabled) {
      this.isLoading = true;
      buttonDisabled.disabled = true;
      this.data = {
        login: login,
        password: password
      }

      this.authService.login(this.data).subscribe((data: any) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('BringUsername', data.name)
        this.authService.isLogged = true;
        this.router.navigate(['classroom']);
        this.component.isLogged = true;
      })
    }

  }

}
