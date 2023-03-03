import {Component, Inject, Injectable, Input, NgModule, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../../interfaces/user.interface";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {reduxGermanService} from "../../../services/ngrx-german.service";
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatSelect} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Injectable()
@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  data!: any;
  allClasses$: any = [];
  allImages$: any;
  allFiles$ : any[] = [];
  isText: boolean = true;
  isFiles: boolean = false;
  isImages: boolean = false;
  bringName: any = '';
  loading$: Observable<boolean>;
  panelOpenState = false;

  changes = new Subject<void>();
  paginator!: any;
  currentPageIndex = 0;
  pageSize = 10;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private reduxService: reduxGermanService, public dialog: MatDialog) {
    this.authService.getFiles().subscribe((data: any) => this.allFiles$ = data.Contents)
    this.bringName = localStorage.getItem('BringUsername');
    reduxService.entities$.subscribe((data: any) => {
      this.allClasses$ = data;
      this.allClasses$ = this.allClasses$.map((obj: any, index: number) => ({ ...obj, numberOfClasses: index }));
    });
    this.loading$ = reduxService.loading$;
  }

  ngOnInit() {
    this.getHeroes();
  }

  isTextClass() {
    this.isText = true;
    this.isFiles = false;
    // @ts-ignore
    document.getElementById('summaries-button').style.backgroundColor = '#a9a9a9';
    // @ts-ignore
    document.getElementById('files-button').style.backgroundColor = '#be1e2d';

  }

  isFilesClass() {
    this.isFiles = true;
    this.isText = false;
    // @ts-ignore
    document.getElementById('files-button').style.backgroundColor = '#a9a9a9';
    // @ts-ignore
    document.getElementById('summaries-button').style.backgroundColor = '#be1e2d';
  }

  debugBase64(image: string | SVGImageElement) {

    this.dialog.open(DialogDataExampleDialog, {
      data: {
        image: image,
      },
    });

  }

//  NgRx Redux

  add(hero: any) {
    this.reduxService.add(hero);
  }

  delete(hero: any) {
    this.reduxService.delete(hero.id);
  }

  getHeroes() {
    this.reduxService.getAll();
  }

  update(hero: any) {
    this.reduxService.update(hero);
  }
}

@Component({
  selector: 'dialog-dialog',
  templateUrl: 'data-dialog.html',
  styleUrls: ['./classroom.component.scss']
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("imagem url", data)
  }

}
