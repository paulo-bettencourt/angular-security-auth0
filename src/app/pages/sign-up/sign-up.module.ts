import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogElementsExampleDialog, SignUpComponent} from './component/sign-up/sign-up.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class SignUpModule { }
