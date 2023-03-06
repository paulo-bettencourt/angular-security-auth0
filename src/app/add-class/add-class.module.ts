import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClassComponent } from './component/add-class/add-class.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuillModule} from "ngx-quill";
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    AddClassComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    FormsModule,
    QuillModule.forRoot(),
    MatDialogModule
  ]
})
export class AddClassModule { }
