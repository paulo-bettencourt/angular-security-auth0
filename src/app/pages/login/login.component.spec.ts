import {beforeEach, jest, describe, expect, it, test} from '@jest/globals';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MainPageComponent} from "../../layout/main-page/main-page.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import * as Module from "module";
import {StoreModule} from "@ngrx/store";
import {EntityDataModule} from "@ngrx/data";
import {entityConfig} from "../../ngrx-redux/entity-metadata";
import {EffectsModule} from "@ngrx/effects";
import {RouterModule} from "@angular/router";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {RouterTestingModule} from "@angular/router/testing";

describe('LoginComponent', () => {
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
});

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginComponent } from './login.component';
// import { Router } from '@angular/router';
// import { of } from 'rxjs';
// import {AuthService} from "../../services/auth.service";
//
// interface MockElement extends HTMLElement {
//   disabled: boolean;
// }
//
// interface User {
//   login: string;
//   password: string;
//   token: string;
//   name: string;
// }
//
// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let authService: AuthService;
//   let router: Router;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ LoginComponent ],
//       providers: [
//         { provide: AuthService, useValue: { login: jest.fn() } },
//         { provide: Router, useValue: { navigate: jest.fn() } }
//       ]
//     })
//       .compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     authService = TestBed.inject(AuthService);
//     router = TestBed.inject(Router);
//     fixture.detectChanges();
//   });
//
//   it('should set isLoading to true and disable the submit button when the form is valid', () => {
//     const loginMock = jest.spyOn(authService, 'login').mockReturnValue(of({
//       login: 'test@test.com',
//       password: 'password',
//       token: '123',
//       name: 'John',
//     } as User));
//     const navigateMock = jest.spyOn(router, 'navigate');
//     const formMock = {
//       valid: true,
//       controls: {login: {value: 'test@test.com'}, password: {value: 'password'}}
//     };
//     type MockHTMLElement = HTMLElement & { disabled: boolean };
//     const getElementByIdMock = jest.spyOn(document, 'getElementById').mockImplementation(
//       (id: string): MockElement => {
//         return {
//           tagName: 'BUTTON',
//           disabled: false,
//           // add other properties as needed
//         } as MockElement;
//       }
//     );
//
//     expect(component.isLoading).toBe(true);
//     expect(getElementByIdMock).toHaveBeenCalledWith('submitButtonLogin');
//     // expect(getElementByIdMock.mockReturnValue.disabled).toBe(true);
//
//     loginMock.mockRestore();
//     navigateMock.mockRestore();
//     getElementByIdMock.mockRestore();
//   });
// });
