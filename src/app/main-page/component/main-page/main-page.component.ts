import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  isLogged: boolean = false;

  constructor(private router: Router, private service: AuthService) {
    this.service.isLoggedGetter.subscribe(data => {
      this.isLogged = data;
    })
  }


  logout() {
    this.service.isLogged = false;
    this.router.navigate(['']);
  }
}
