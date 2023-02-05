import { Component } from '@angular/core';
import {FormBuilder, Validator, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../interfaces/user.interface";
import {Router} from "@angular/router";

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  submit() {
    const login = this.form.controls['login'].value;
    const password = this.form.controls['password'].value;
    console.log("-->", this.form.controls['login'].value)
    if(login && password) {
      this.data = {
        login: login,
        password: password
      }
    }
    console.log("payload", this.data)
    this.authService.login(this.data).subscribe(data => {
      this.authService.isLogged = true;
      this.router.navigate(['classroom'])
    })
  }

}
