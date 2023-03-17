import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './component/welcome/welcome.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FooterModule} from "../footer/footer.module";

@NgModule({
  declarations: [
    WelcomeComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FooterModule
    ]
})
export class WelcomeModule { }

