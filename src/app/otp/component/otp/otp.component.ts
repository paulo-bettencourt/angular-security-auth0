import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../../interfaces/user.interface";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {

  form = this.fb.group({
    otp: ['', Validators.required],
  })
  data!: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  submit() {
    const otp = this.form.controls['otp'].value;
    console.log("-->", this.form.controls['otp'].value)
    if(otp) {
      this.data = {
        otp: otp
      }
    }
    console.log("payload", this.data)
    this.authService.otp(this.data).subscribe(data => {
      this.router.navigate(['classroom'])
    })
  }

}
