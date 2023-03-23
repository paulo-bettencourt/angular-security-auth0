import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./footer/footer.component";
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./main-page/main-page.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {LoginComponent} from "../pages/login/login.component";
import {SignUpComponent} from "../pages/sign-up/sign-up.component";
import {ClassroomComponent} from "../pages/classroom/list/classroom.component";
import {CanActivateToken} from "../guards/token.guard";
import {OtpComponent} from "../pages/otp/otp.component";
import {AddClassComponent} from "../pages/crud-class/add/add-class.component";
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";

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
      path: 'add',
      component: AddClassComponent
    }
  ]
}];

@NgModule({
  declarations: [
    FooterComponent,
    MainPageComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    CanActivateToken
  ]
})
export class LayoutModule { }
