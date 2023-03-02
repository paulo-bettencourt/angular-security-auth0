import {AfterViewInit, Component, HostListener} from '@angular/core';
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
  jwtToken = localStorage.getItem('jwtBringGlobalToken');

  constructor(private router: Router, private service: AuthService, private reduxService: reduxGermanService) {
    this.service.getJwtToken(this.jwtToken).subscribe((data:any) =>  {
      console.log("aqui está o request para saber se está logado e o resultado é --> ", data.jwt)
      data.jwt === "true" ? this.isLogged = true : this.isLogged = false;
    });
  }

  logout() {
    this.reduxService.clearCache();
    this.router.navigate(['']);
    localStorage.removeItem('jwtBringGlobalToken');
    this.service.logout().subscribe(data => console.log(data));
    this.isLogged = false;
  }

  addNewClass() {}

}
