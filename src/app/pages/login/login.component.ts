import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import { User } from '../../interfaces/user.interface';
import { MainPageComponent } from '../../layout/main-page/main-page.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = this.fb.group({
    login: [
      '',
      [Validators.required, Validators.email, this.bringGlobalEmailValidator()],
    ],
    password: ['', Validators.required],
  });
  data!: User;
  isLoading = false;
  errorMessageBoolean = false;
  errorMessageText = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private component: MainPageComponent
  ) {}

  submit() {
    const buttonDisabled = document.getElementById(
      'submitButtonLogin'
    ) as HTMLInputElement;
    const login = this.form.controls['login'].value;
    const password = this.form.controls['password'].value;

    if (login && password && this.form.valid) {
      this.isLoading = true;
      buttonDisabled.disabled = true;
      this.data = {
        login: login,
        password: password,
      };

      this.authService.login(this.data).subscribe({
        next: (data: any) => {
          console.log('DATA--> ', data);
          if (data.isAdmin === true) {
            this.router.navigate(['dashboard']);
          } else {
            localStorage.setItem('jwtBringGlobalToken', data.token);
            localStorage.setItem('BringUsername', data.name);
            this.authService.isLogged = true;
            this.router.navigate(['classroom']);
            this.component.isLogged = true;
          }
        },
        error: (data) => {
          this.isLoading = false;
          buttonDisabled.disabled = false;
          this.errorMessageBoolean = true;
          this.errorMessageText = data.error.message;
        },
      });
    }
  }

  bringGlobalEmailValidator(): any {
    return (control: FormControl): { [key: string]: any } | null => {
      const email = control.value;
      if (email && email.indexOf('@') !== -1) {
        const domain = email.split('@')[1];
        if (domain !== 'bringglobal.com') {
          return { invalidDomain: true };
        }
      }
      return null;
    };
  }
}
