import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpComponent } from './component/otp/otp.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    OtpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class OtpModule { }
