import {AfterViewInit, Component, Input} from '@angular/core';
import {Router, RouterModule, Routes} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {reduxGermanService} from "../../services/ngrx-german.service";
import {ThemePalette} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {AddClassComponent} from "../../pages/crud-class/add/add-class.component";
import {CommonModule} from "@angular/common";
import {WelcomeComponent} from "../welcome/welcome.component";
import {LoginComponent} from "../../pages/login/login.component";
import {SignUpComponent} from "../../pages/sign-up/sign-up.component";
import {ClassroomComponent} from "../../pages/classroom/list/classroom.component";
import {CanActivateToken} from "../../guards/token.guard";
import {OtpComponent} from "../../pages/otp/otp.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports:[
    CommonModule,
    RouterModule
  ],
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements AfterViewInit {

  isLogged: boolean = false;
  jwtToken = localStorage.getItem('jwtBringGlobalToken');
  isMenuBoolean: boolean = false
  @Input() color: ThemePalette = 'warn';

  constructor(private router: Router, private service: AuthService, private reduxService: reduxGermanService,
              public dialog: MatDialog
  ) {
    this.service.getJwtToken(this.jwtToken).subscribe((data: any) => {
      console.log("DATA JWT: ", data)
      data.jwt === "true" ? this.isLogged = true : this.isLogged = false;
    });
  }

  ngAfterViewInit(): void {
    this.detectIfWindowWasResized();
    this.eventToHideMenu();
  }

  logout() {
    this.reduxService.clearCache();
    this.router.navigate(['']);
    localStorage.removeItem('jwtBringGlobalToken');
    localStorage.removeItem('BringUsername');
    this.service.logout().subscribe(data => console.log(data));
    this.isLogged = false;
    console.log("entreou no mob logout")
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

  private detectIfWindowWasResized() {
    window.addEventListener('resize', () => {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (width > 767) {
        this.isMenuBoolean = false;
      }
    });
  }

  private eventToHideMenu() {
    const hamburguerMenu = document.getElementById('container-hamburger');
    if (hamburguerMenu) {
      hamburguerMenu.addEventListener('click', () => {
        this.isMenuBoolean = !this.isMenuBoolean;
        setTimeout(() => {
          const menuItems = document.getElementsByClassName('items-responsive');
          for (var i = 0; i < menuItems.length; i++) {
            menuItems[i].addEventListener('click', () => {
              this.isMenuBoolean = !this.isMenuBoolean;
            })
          }
        }, 0)
      })
    }
  }
}
