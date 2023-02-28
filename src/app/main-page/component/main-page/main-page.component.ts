import { Component } from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {reduxGermanService} from "../../../services/ngrx-german.service";
import { EntityCollectionService } from '@ngrx/data';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  isLogged: boolean = false;

  constructor(private router: Router, private service: AuthService, private reduxService: reduxGermanService) {
    this.reduxService.entities$.subscribe(data => data.length ? this.isLogged = true : this.isLogged = false);
  }

  logout() {
    this.reduxService.clearCache();
    this.reduxService.entities$.subscribe(data => data.length ? this.isLogged = true : this.isLogged = false);
    this.router.navigate(['']);
  }

  addNewClass() {}

}
