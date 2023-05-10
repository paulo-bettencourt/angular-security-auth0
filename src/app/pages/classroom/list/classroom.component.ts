import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  Injectable,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill';
import { Observable, Subject, takeUntil } from 'rxjs';
import { VideoComponent } from 'src/app/components/video-player/video-player.component';
import { AuthService } from 'src/app/services/auth.service';

import { reduxGermanService } from '../../../services/ngrx-german.service';
import { DeleteClassDialog } from '../../crud-class/delete/delete-class.component';
import { EditClassDialog } from '../../crud-class/edit/edit-class-dialog.component';
import { ImageDialog } from '../image-dialog/image-dialog.component';
import { WebSocketService } from 'src/app/services/web-socket.service';

export interface ClassSignal {
  title: string;
}

export function untilDestroyed() {
  const subject = new Subject();

  inject(DestroyRef).onDestroy(() => {
    subject.next(true);
    subject.complete();
  });

  return <T>() => takeUntil<T>(subject.asObservable());
}

@Injectable()
@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    QuillModule,
    NgxDropzoneModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    VideoComponent,
  ],
  templateUrl: './classroom.component.html',
})
export class ClassroomComponent implements OnInit, OnDestroy {
  data!: any;
  allClasses$: any = [];
  allImages$: any;
  allFiles$: any[] = [];
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
  quotes = [
    {
      quote: 'Making mistakes is normal and important for learning a language.',
    },
    { quote: 'Every day is an opportunity to learn something new.' },
    {
      quote: 'Learning languages opens doors to new cultures and experiences.',
    },
    { quote: 'Learning a new language is like discovering a new world.' },
    {
      quote:
        'Language learning is an adventure that accompanies you for a lifetime.',
    },
    {
      quote:
        'Only those who know their goal will find the way. Set a clear goal when learning a language.',
    },
    {
      quote:
        'Learning a language broadens your horizons and promotes your thinking ability.',
    },
    {
      quote:
        'Practice makes perfect - and that also applies to learning a language.',
    },
    {
      quote:
        'Start small and work your way up step by step. Every progress counts!',
    },
    {
      quote:
        'Language learning can be difficult, but it is one of the most rewarding challenges out there.',
    },
  ];
  ngUnsubscribe = new Subject();

  // Inject DI instead of Constructor DI
  private reduxService = inject(reduxGermanService);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private webSocketService = inject(WebSocketService);
  private untilDestroyed = untilDestroyed();
  counterLoggedIn!: number;
  intervalId: any;
  userID!: any;

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.bringName = localStorage.getItem('BringUsername');
    this.loading$ = this.reduxService.loading$;
    this.reduxService.entities$
      .pipe(this.untilDestroyed())
      .subscribe((data: any) => {
        this.allClasses$ = data;
        this.allClasses$ = this.allClasses$
          .map((obj: any, index: number) => ({
            ...obj,
            numberOfClasses: index,
          }))
          .reverse();
      });
  }

  ngOnInit() {
    this.getHeroes();
    const data = this.route.snapshot.queryParams['data'];
    this.userID = JSON.parse(data);
    this.webSocketService.connectWebSocket(this.userID);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
  }

  isTextClass() {
    this.isText = true;
    this.isFiles = false;
    // @ts-ignore
    document.getElementById('summaries-button').style.backgroundColor =
      '#a9a9a9';
    // @ts-ignore
    document.getElementById('files-button').style.backgroundColor = '#be1e2d';
  }

  isFilesClass() {
    this.isFiles = true;
    this.isText = false;
    // @ts-ignore
    document.getElementById('files-button').style.backgroundColor = '#a9a9a9';
    // @ts-ignore
    document.getElementById('summaries-button').style.backgroundColor =
      '#be1e2d';
  }

  debugBase64(image: string | SVGImageElement) {
    this.dialog.open(ImageDialog, {
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
      width: '100vw',
      disableClose: true,
    });
  }

  deleteClassById(id: any) {
    this.dialog.open(DeleteClassDialog, {
      data: { id: id },
    });
  }

  timeLoggedIn(id: string) {
    this.authService.getTimeLoggedIn(id).subscribe((data: any) => {
      this.counterLoggedIn = data.time;
      this.startCounter(id);
    });
  }

  startCounter(id: string) {
    /*     this.intervalId = setInterval(() => {
      this.subscriptionTimeLoggedIn = this.authService
        .timeLoggedIn(id, this.counterLoggedIn)
        .subscribe((data: any) =>
          console.log('User has been logged in for: ', data.timeLoggedIn)
        );
      this.counterLoggedIn++;
    }, 3000); */
  }
}
