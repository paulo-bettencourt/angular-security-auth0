import {Component, NgZone} from '@angular/core';
import {FormBuilder, FormControl, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../interfaces/user.interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {reduxGermanService} from "../../services/ngrx-german.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {

  form = this.fb.group({
    login: ['', [Validators.required, Validators.email, this.bringGlobalEmailValidator()]],
    password: ['', Validators.required]
  });
  data!: User;
  isLoading = false;
  isError = false;

  constructor(private reduxService: reduxGermanService, private fb: FormBuilder, private authService: AuthService, private router: Router, public dialog: MatDialog) {}

  submit() {
    const login = this.form.controls['login'].value;
    const password = this.form.controls['password'].value;
    const buttonDisabled = document.getElementById('submitButtonLogin') as HTMLInputElement

    if(login && password && this.form.valid) {
      this.isLoading = true;
      buttonDisabled.disabled = true;
      this.data = {
        name: this.getNameFromEmail(login),
        login: login,
        password: password
      }
      this.authService.signup(this.data).subscribe({
        next: () => {
          localStorage.setItem('BringUsername',this.getNameFromEmail(login))
          this.router.navigate(['otp'])
        },
        error: (err: any) => {
          console.log('Error: ', err);
          this.isError = true;
          this.isLoading = false;
        }
      })
    }
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

  bringGlobalEmailValidator(): any {
    return (control: FormControl): { [key: string]: any } | null => {
      const email = control.value;
      if (email && email.indexOf('@') !== -1) {
        const domain = email.split('@')[1];
        if (domain !== 'bringglobal.com') {
          return { 'invalidDomain': true };
        }
      }
      return null;
    };
  }
}
