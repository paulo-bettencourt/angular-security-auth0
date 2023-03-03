import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './component/main-page/main-page.component';
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "../welcome/component/welcome/welcome.component";
import {LoginComponent} from "../login/component/login/login.component";
import {SignUpComponent} from "../sign-up/component/sign-up/sign-up.component";
import {ClassroomComponent} from "../classroom/component/classroom/classroom.component";
import {OtpComponent} from "../otp/component/otp/otp.component";
import { CanActivateToken } from '../guards/token.guard'
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../interceptors/auth.interceptor";
import {AddClassComponent} from "../add-class/component/add-class/add-class.component";
import {MatTabsModule} from '@angular/material/tabs';


const routes: Routes = [{
  path: '',
  component: MainPageComponent,
  children: [
    {
      path: '',
      component: WelcomeComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'sign-up',
      component: SignUpComponent
    },
    {
      path: 'classroom',
      component: ClassroomComponent,
      canActivate: [CanActivateToken]
    },
    {
      path: 'otp',
      component: OtpComponent
    },
    {
      path: 'add-class',
      component: AddClassComponent
    }
  ]
}];

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule
  ],
  providers: [
    CanActivateToken
  ]
})
export class MainPageModule { }
