import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClassroomComponent} from './component/classroom/classroom.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [
    ClassroomComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class ClassroomModule { }
