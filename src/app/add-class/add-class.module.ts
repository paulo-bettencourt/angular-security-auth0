import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClassComponent } from './component/add-class/add-class.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuillModule} from "ngx-quill";
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [
    AddClassComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    FormsModule,
    QuillModule.forRoot()
  ]
})
export class AddClassModule { }
