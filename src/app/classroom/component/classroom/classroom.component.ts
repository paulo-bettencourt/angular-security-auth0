import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../../interfaces/user.interface";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {reduxGermanService} from "../../../services/ngrx-german.service";

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit{

  data!: any;
  allClasses$: any;
  allImages$: any;
  allFiles$ : any[] = [];
  isText: boolean = true;
  isFiles: boolean = false;
  isImages: boolean = false;
  bringName: any = '';
  loading$: Observable<boolean>;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private reduxService: reduxGermanService) {
    this.authService.getFiles().subscribe((data: any) => this.allFiles$ = data.Contents)
    this.bringName = localStorage.getItem('BringUsername');
    this.allClasses$ = reduxService.entities$;
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
      // @ts-ignore
      window.open().document.write('<iframe src="' + image  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
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
