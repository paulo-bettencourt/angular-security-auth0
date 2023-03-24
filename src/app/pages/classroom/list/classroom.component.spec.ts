import { ComponentFixture, TestBed } from '@angular/core/testing';
import {beforeEach, jest, describe, expect, it, test} from '@jest/globals';
import { ClassroomComponent } from './classroom.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {EntityDataModule} from "@ngrx/data";
import {entityConfig} from "../../../ngrx-redux/entity-metadata";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";

describe('ClassroomComponent', () => {
  let component: ClassroomComponent;
  let fixture: ComponentFixture<ClassroomComponent>;

  beforeEach(() => {
     TestBed.configureTestingModule({
      declarations: [ ClassroomComponent ],
      imports: [HttpClientTestingModule, EffectsModule.forRoot([]), StoreModule.forRoot({}), EntityDataModule.forRoot(entityConfig), RouterModule, RouterTestingModule, MatDialogModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
