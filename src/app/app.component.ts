import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {reduxGermanService} from "./services/ngrx-german.service";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {
  DefaultDataServiceConfig,
  EntityActionFactory,
  EntityCollectionServiceElementsFactory,
  EntityDispatcherFactory
} from "@ngrx/data";
import {environment} from "../environments/environment";
import {MatButtonModule} from "@angular/material/button";

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.baseUrl,
  timeout: 30000, // request timeout
}

// @ts-ignore
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    reduxGermanService,
    EntityCollectionServiceElementsFactory,
    EntityDispatcherFactory,
    EntityActionFactory,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: DefaultDataServiceConfig,
      useValue: defaultDataServiceConfig
    },
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-security-auth0';
}
