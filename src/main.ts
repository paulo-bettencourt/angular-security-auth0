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
import {importProvidersFrom} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {entityConfig} from "./app/ngrx-redux/entity-metadata";


const routes: Routes = [{
  path: '',
  loadChildren: () => import('./app/layout/layout.module').then(m=>m.LayoutModule )
}
];

//platformBrowserDynamic().bootstrapModule(AppModule)
//  .catch(err => console.error(err));

bootstrapApplication(AppComponent,{
  providers: [
    importProvidersFrom(
      HttpClientModule,
      EntityDataModule.forRoot(entityConfig),
      EffectsModule.forRoot([]),
      StoreModule.forRoot({}),
      RouterModule.forRoot(routes))]
});
