import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import { OtpComponent } from './otp.component';
import {beforeEach, jest, describe, expect, it, test} from '@jest/globals';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {StoreModule} from "@ngrx/store";
import {EntityDataModule} from "@ngrx/data";
import {entityConfig} from "../../ngrx-redux/entity-metadata";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {RouterModule} from "@angular/router";
import {EffectsModule} from "@ngrx/effects";
import {MainPageComponent} from "../../layout/main-page/main-page.component";

describe('OtpComponent', () => {
  let component: OtpComponent;
  let fixture: ComponentFixture<OtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpComponent ],
      imports: [HttpClientTestingModule, EffectsModule.forRoot([]), StoreModule.forRoot({}), EntityDataModule.forRoot(entityConfig), RouterModule, RouterTestingModule, MatDialogModule],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      },
        {
          provide: MainPageComponent,
          useValue: {}
        }],
      schemas: [NO_ERRORS_SCHEMA]
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
