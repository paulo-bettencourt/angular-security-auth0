import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {HttpClientModule} from "@angular/common/http";
import {DefaultDataServiceConfig, EntityDataModule} from "@ngrx/data";
import {environment} from "./environments/environment";
import {RouterModule, Routes} from "@angular/router";
import {importProvidersFrom, isDevMode} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {entityConfig} from "./app/ngrx-redux/entity-metadata";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {WelcomeComponent} from "./app/layout/welcome/welcome.component";
import {LoginComponent} from "./app/pages/login/login.component";
import {SignUpComponent} from "./app/pages/sign-up/sign-up.component";
import {ClassroomComponent} from "./app/pages/classroom/list/classroom.component";
import {CanActivateToken} from "./app/guards/token.guard";
import {OtpComponent} from "./app/pages/otp/otp.component";
import {AddClassComponent} from "./app/pages/crud-class/add/add-class.component";

const routes: Routes = [{
  path: '',
  loadComponent: () => import('./app/layout/main-page/main-page.component').then(m=>m.MainPageComponent),
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
}
];

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.baseUrl,
  timeout: 30000, // request timeout
}

bootstrapApplication(AppComponent,{
  providers: [
    {
      provide: DefaultDataServiceConfig,
      useValue: defaultDataServiceConfig
    },
    importProvidersFrom(
      BrowserAnimationsModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      EntityDataModule.forRoot(entityConfig),
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: !isDevMode(), // Restrict extension to log-only mode
        autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
        traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      }),
      HttpClientModule,
      MatButtonModule,
      MatTooltipModule,
      MatDialogModule,
      RouterModule.forRoot(routes))]
});
