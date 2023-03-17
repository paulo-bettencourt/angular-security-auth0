import {
  Component,
  Inject,
  Injectable,
  OnInit, signal
} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {reduxGermanService} from "../../../services/ngrx-german.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {EditClassDialog} from "./edit-class-dialog.component";

export interface ClassSignal {
  title: string;
}

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
  quotes = [  { quote: "Making mistakes is normal and important for learning a language." },  { quote: "Every day is an opportunity to learn something new." },  { quote: "Learning languages opens doors to new cultures and experiences." },  { quote: "Learning a new language is like discovering a new world." },  { quote: "Language learning is an adventure that accompanies you for a lifetime." },  { quote: "Only those who know their goal will find the way. Set a clear goal when learning a language." },  { quote: "Learning a language broadens your horizons and promotes your thinking ability." },  { quote: "Practice makes perfect - and that also applies to learning a language." },  { quote: "Start small and work your way up step by step. Every progress counts!" },  { quote: "Language learning can be difficult, but it is one of the most rewarding challenges out there." }];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private reduxService: reduxGermanService, public dialog: MatDialog) {
    this.authService.getFiles().subscribe((data: any) => this.allFiles$ = data.Contents)
    this.bringName = localStorage.getItem('BringUsername');
    reduxService.entities$.subscribe((data: any) => {
      this.allClasses$ = data;
      this.allClasses$ = this.allClasses$.map((obj: any, index: number) => ({ ...obj, numberOfClasses: index })).reverse();
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

  openDialog(id: any, title: any, text: any, image: any, file: any): void {
    this.dialog.open(EditClassDialog, {
      data: {
        id: id,
        title: title,
        text: text,
        image: image,
        file: file,
      },
      height: '95vh',
      width: '60%',
      disableClose: true
    });
  }

  deleteClassById(id: any) {
    this.dialog.open(DeleteClassDialog, {
      data: { id: id }
    }, );
  }

}

@Component({
  selector: 'dialog-dialog',
  templateUrl: 'data-dialog.html',
  styleUrls: ['./classroom.component.scss']
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
  selector: 'delete-class-dialog',
  templateUrl: 'delete-class-dialog.html',
  styleUrls: ['./delete-class-dialog.scss']
})
export class DeleteClassDialog {
  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {id: string},
              private authService: AuthService,
              private reduxService: reduxGermanService,
              public dialog: MatDialog) {}

  delete() {
    this.reduxService.delete(this.data.id);
    this.dialog.closeAll();
  }

  deleteClassById(id: any) {
    this.reduxService.delete(id).subscribe({
      next: () => console.log(""),
      error: (err: any) => console.log("error: ", err)
    });
  };

  cancelDelete() {
    this.dialog.closeAll();
  }
}

