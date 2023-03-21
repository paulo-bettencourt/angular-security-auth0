import {AfterViewInit, Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {reduxGermanService} from "../../services/ngrx-german.service";
import {ThemePalette} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {AddClassComponent} from "../../pages/crud-class/add/add-class.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements AfterViewInit{

  isLogged: boolean = false;
  jwtToken = localStorage.getItem('jwtBringGlobalToken');
  isMenuBoolean: boolean = false
  @Input() color: ThemePalette = 'warn';

  constructor(private router: Router, private service: AuthService, private reduxService: reduxGermanService, public dialog: MatDialog) {
    this.service.getJwtToken(this.jwtToken).subscribe((data: any) => {
      data.jwt === "true" ? this.isLogged = true : this.isLogged = false;
    });
  }

  ngAfterViewInit(): void {
    this.detectIfWindowWasResized();
  }

  logout() {
    this.reduxService.clearCache();
    this.router.navigate(['']);
    localStorage.removeItem('jwtBringGlobalToken');
    localStorage.removeItem('BringUsername');
    this.service.logout().subscribe(data => console.log(data));
    this.isLogged = false;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddClassComponent, {
      height: '95vh',
      width: '100vw',
      disableClose: true,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  isMenu() {
    this.isMenuBoolean = !this.isMenuBoolean;
  }

  private detectIfWindowWasResized() {
    const menuItems = document.getElementsByClassName('menu-list-items-nav');
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(menuItems) {
        window.addEventListener('resize', () => {
        if(width > 767) {
          this.isMenuBoolean = false;
        }
      });
    }
  }
}
