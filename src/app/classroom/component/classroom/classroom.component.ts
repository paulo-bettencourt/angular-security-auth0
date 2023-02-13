import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../../interfaces/user.interface";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {HeroService} from "../../../services/ngrx-german.service";

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent {

  data!: any;
  allClasses$: any;
  allImages$: any;
  allFiles$ : any[] = [];
  isText: boolean = true;
  isFiles: boolean = false;
  isImages: boolean = false;
  bringName: any = '';
  loading$: Observable<boolean>;
  heroes$: Observable<any[]>;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private heroService: HeroService) {
    this.allClasses$ = this.authService.getClasses();
    this.allImages$ = this.authService.getImages();
    this.authService.getFiles().subscribe((data: any) => {
      console.log("DATA->", data.Contents)
      this.allFiles$ = data.Contents
      console.log("DATA É ARRAY?!", this.allFiles$)
    })
    this.bringName = localStorage.getItem('BringUsername');
    this.heroes$ = heroService.entities$;
    this.loading$ = heroService.loading$;
  }

  isTextClass() {
    this.isText = !this.isText;
    this.isFiles = false;
    this.isImages = false;
  }

  isFilesClass() {
    this.isFiles = !this.isFiles;
    this.isImages = false;
    this.isText = false;
  }

  isImagesClass() {
    this.isImages = !this.isImages;
    this.isText = false;
    this.isFiles = false;
  }

  debugBase64(image: string | SVGImageElement) {
      // @ts-ignore
      window.open().document.write('<iframe src="' + image  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  }

//  NgRx Redux

  add(hero: any) {
    this.heroService.add(hero);
  }

  delete(hero: any) {
    this.heroService.delete(hero.id);
  }

  getHeroes() {
    this.heroService.getAll();
  }

  update(hero: any) {
    this.heroService.update(hero);
  }

  ngOnInit() {
    this.getHeroes();
  }


}
