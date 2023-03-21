import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CdkAccordionModule} from "@angular/cdk/accordion";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {QuillModule} from "ngx-quill";
import {NgxDropzoneModule} from "ngx-dropzone";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {ClassroomComponent, DialogDataExampleDialog} from "./classroom/classroom.component";



@NgModule({
  declarations: [
    ClassroomComponent,
    DialogDataExampleDialog
  ],
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    QuillModule,
    NgxDropzoneModule,
    RouterModule,
    MatButtonModule
  ]
})
export class PagesModule { }