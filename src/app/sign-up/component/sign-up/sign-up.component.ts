import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../../interfaces/user.interface";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  form = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });
  data!: User;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  submit() {
    const login = this.form.controls['login'].value;
    const password = this.form.controls['password'].value;
    console.log("-->", this.form.controls['login'].value)



    if(login && password) {
      this.data = {
        name: this.getNameFromEmail(login),
        login: login,
        password: password
      }
    }
    console.log("payload", this.data)
    this.authService.signup(this.data).subscribe(data => {
      localStorage.setItem('BringUsername',this.getNameFromEmail(login))
      this.router.navigate(['otp'])
    })
  }

  getNameFromEmail(login: any) {
    var username = login.match(/^([^@]*)@/)[1];
    let loginArray = username.split(".");
    let newArray = loginArray.map((word: any) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const rest = word.slice(1).toLowerCase();
      return firstLetter + rest;
    });
    return newArray.join(' ');
  }
}
