import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

import { AddClassComponent } from '../../pages/crud-class/add/add-class.component';
import { AuthService } from '../../services/auth.service';
import { reduxGermanService } from '../../services/ngrx-german.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements AfterViewInit, OnDestroy {
  isLogged: boolean = false;
  jwtToken = localStorage.getItem('jwtBringGlobalToken');
  isMenuBoolean: boolean = false;
  ngUnsubscribe = new Subject();
  @Input() color: ThemePalette = 'warn';

  constructor(
    private router: Router,
    private authService: AuthService,
    private reduxService: reduxGermanService,
    public dialog: MatDialog,
    route: ActivatedRoute
  ) {
    this.getsJwtToken();
  }

  ngAfterViewInit(): void {
    this.detectIfWindowWasResized();
    this.eventToHideMenu();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
  }

  getsJwtToken(): void {
    this.authService.getJwtToken(this.jwtToken).subscribe((data: any) => {
      data.jwt === 'true' ? (this.isLogged = true) : (this.isLogged = false);
    });
  }

  logout() {
    this.reduxService.clearCache();
    this.router.navigate(['']);
    localStorage.removeItem('jwtBringGlobalToken');
    localStorage.removeItem('BringUsername');
    this.isLogged = false;
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
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
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
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
            });
          }
        }, 0);
      });
    }
  }
}
