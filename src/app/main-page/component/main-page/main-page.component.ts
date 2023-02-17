import { Component } from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {reduxGermanService} from "../../../services/ngrx-german.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  isLogged: boolean = false;

  constructor(private router: Router, private service: AuthService) {

    if(localStorage.getItem('BringUsername')) {
      this.isLogged = true;
    } else {
      this.service.isLoggedGetter.subscribe(data => {
        this.isLogged = data;
        console.log("isLooged subscribe", this.isLogged)
      })
    }

  }

  logout() {
    localStorage.removeItem('BringUsername');
    this.isLogged = !!localStorage.getItem('BringUsername')
    this.service.isLogged = false;
    this.router.navigate(['']);
  }

  addNewClass() {}

}
