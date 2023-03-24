import { ComponentFixture, TestBed } from '@angular/core/testing';
import {beforeEach, jest, describe, expect, it, test} from '@jest/globals';
import { OtpComponent } from './otp.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {EntityDataModule} from "@ngrx/data";
import {entityConfig} from "../../ngrx-redux/entity-metadata";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {MainPageComponent} from "../../layout/main-page/main-page.component";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('OtpComponent', () => {
  let component: OtpComponent;
  let fixture: ComponentFixture<OtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpComponent ],
      imports: [HttpClientTestingModule, EffectsModule.forRoot([]), StoreModule.forRoot({}), EntityDataModule.forRoot(entityConfig), RouterModule, RouterTestingModule, MatDialogModule],
      providers: [
        { provide: MainPageComponent, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
