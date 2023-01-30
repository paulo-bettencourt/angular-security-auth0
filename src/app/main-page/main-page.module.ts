import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './component/main-page/main-page.component';
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "../welcome/component/welcome/welcome.component";

const routes: Routes = [{
  path: '',
  component: MainPageComponent,
  children: [
    {
      path: '',
      component: WelcomeComponent
    }
  ]
}];

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MainPageModule { }
