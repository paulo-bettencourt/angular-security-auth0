import {beforeEach, jest, describe, expect, it, test} from '@jest/globals';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MainPageComponent} from "../../layout/main-page/main-page.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {StoreModule} from "@ngrx/store";
import {EntityDataModule} from "@ngrx/data";
import {entityConfig} from "../../ngrx-redux/entity-metadata";
import {EffectsModule} from "@ngrx/effects";
import { RouterModule} from "@angular/router";
import { MatDialogModule } from '@angular/material/dialog';
import {RouterTestingModule} from "@angular/router/testing";


describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageComponent ], // add the component to the declarations array,
      imports: [HttpClientTestingModule, EffectsModule.forRoot([]), StoreModule.forRoot({}), EntityDataModule.forRoot(entityConfig), RouterModule, RouterTestingModule, MatDialogModule],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
