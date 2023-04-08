import {Component, NgModule} from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import {bootstrapApplication} from "@angular/platform-browser";

@NgModule({
  imports: [
    ServerModule
  ]
})
export class AppServerModule {}

bootstrapApplication(AppComponent);
