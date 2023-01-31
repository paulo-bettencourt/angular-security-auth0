import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../../interfaces/user.interface";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent {

  isNewClass: boolean = false;

  form = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  })
  data!: User;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  addNewClass() {
    this.isNewClass = !this.isNewClass;
  }


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
    this.authService.signup(this.data).subscribe(data => {
      this.authService.isLogged = true;
      this.router.navigate(['classroom'])
    })
  }
}
