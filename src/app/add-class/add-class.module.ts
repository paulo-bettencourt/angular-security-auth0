import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClassComponent } from './component/add-class/add-class.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AddClassComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AddClassModule { }
