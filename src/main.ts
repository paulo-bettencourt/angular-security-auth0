/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {reduxGermanService} from "./app/services/ngrx-german.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./app/interceptors/auth.interceptor";
import {DefaultDataServiceConfig, EntityDataModule} from "@ngrx/data";
import {environment} from "./environments/environment";
import {provideRouter, RouterModule, Routes} from "@angular/router";
import {importProvidersFrom, isDevMode} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {entityConfig} from "./app/ngrx-redux/entity-metadata";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./app/layout/layout.module').then(m=>m.LayoutModule )
}
];

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.baseUrl,
  timeout: 30000, // request timeout
}

//platformBrowserDynamic().bootstrapModule(AppModule)
//  .catch(err => console.error(err));

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
