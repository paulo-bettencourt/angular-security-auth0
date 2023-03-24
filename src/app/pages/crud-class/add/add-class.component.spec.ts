import { ComponentFixture, TestBed } from '@angular/core/testing';
import {beforeEach, jest, describe, expect, it, test} from '@jest/globals';
import { AddClassComponent } from './add-class.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { EffectsModule } from '@ngrx/effects';
import {StoreModule} from "@ngrx/store";
import {EntityDataModule} from "@ngrx/data";
import {entityConfig} from "../../../ngrx-redux/entity-metadata";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {RouterModule} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('AddClassComponent', () => {
  let component: AddClassComponent;
  let fixture: ComponentFixture<AddClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClassComponent ],
      imports: [HttpClientTestingModule, EffectsModule.forRoot([]), StoreModule.forRoot({}), EntityDataModule.forRoot(entityConfig), RouterModule, RouterTestingModule, MatDialogModule],
      providers: [     {
        provide: MatDialogRef,
        useValue: {}
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
