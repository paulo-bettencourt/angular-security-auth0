import { ComponentFixture, TestBed } from '@angular/core/testing';
import {beforeEach, jest, describe, expect, it, test} from '@jest/globals';
import { SignUpComponent } from './sign-up.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {EntityDataModule} from "@ngrx/data";
import {entityConfig} from "../../ngrx-redux/entity-metadata";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(() => {
     TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [HttpClientTestingModule, EffectsModule.forRoot([]), StoreModule.forRoot({}), EntityDataModule.forRoot(entityConfig), RouterModule, RouterTestingModule, MatDialogModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
