import {Component, ElementRef, Inject, Injectable, Input, NgModule, OnInit, ViewChild} from '@angular/core';
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
import {HttpClient} from "@angular/common/http";

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
      width: '60%'
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("imagem url", data)
  }
}

@Component({
  selector: 'edit-class-dialog',
  templateUrl: 'delete-class-dialog.html',
  styleUrls: ['./delete-class-dialog.scss']
})
export class DeleteClassDialog {
  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {id: string},
              private authService: AuthService,
              private reduxService: reduxGermanService,
              public dialog: MatDialog) {
    console.log("imagem url", data)
  }

  delete() {
    this.reduxService.delete(this.data.id);
    this.dialog.closeAll();
  }

  deleteClassById(id: any) {
    alert("hi")
    this.reduxService.delete(id).subscribe({
      next: () => console.log("sucesso"),
      error: (err: any) => console.log("error: ", err)
    });
  };


  //   this.authService.deleteClass(id).subscribe({
  //     next: () => console.log("sucesso"),
  //     error: (err: any) => console.log("error: ", err)
  //   });
  // }


  cancelDelete() {
    this.dialog.closeAll();
  }
}

@Component({
  selector: 'edit-class-dialog',
  templateUrl: 'edit-class-dialog.html',
  styleUrls: ['./edit-class-dialog.scss']
})
export class EditClassDialog {

  typeOfClass!: any;
  nameOfFile: string = '';
  nameOfImage!: string;
  fileToUpload: File | null = null;
  formAddClass = this.fb.group({
    nameClass: ['', Validators.required],
    textClass: ['', Validators.required],
    imageClass: ['', Validators.required],
  })
  imageResult: string | ArrayBuffer | null | undefined;
  imageToUpload!: any;
  files: File[] = [];
  fileNameUrl!: string;
  classId!: any;

  editor: any;
  @ViewChild('editor') editorElement: any;
  @ViewChild('imageUploadDropzone') imageUploadDropzone: any;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  quillConfiguration = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      // [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link'],
    ],
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private authService: AuthService, private router: Router, private http: HttpClient, private reduxService: reduxGermanService) {
    console.log("imagem url", this.data.image);
    this.formAddClass.controls['nameClass'].setValue(this.data.title);
    this.formAddClass.controls['textClass'].setValue(this.data.text);
    this.formAddClass.controls['imageClass'].setValue(this.data.image);
    this.classId = this.data.id.trim();
    console.log("DATA P O ID", this.classId)
    if(this.data.image) {
      this.convertData64ToImage(this.data.image)
    }
    this.downloadFile(this.data.file, this.data.file);

  }

  objectToUpdate: any = {
    id: this.classId,
    title: this.formAddClass.controls['nameClass'].value,
    text: this.formAddClass.controls['textClass'].value,
    file: '',
    author: ''
  }

  update() {
    this.reduxService.update(this.objectToUpdate);
  }

// Define a function to download the file and convert it to a File object
  downloadFile(url: string, filename: string): void {
    this.http.get(url, { responseType: 'blob' })
      .toPromise()
      .then((blob: Blob | undefined) => {
        if (blob) {
          // Create a new File object from the downloaded blob
          return this.createFile(blob, filename);
        } else {
          throw new Error('Unable to download file');
        }
      })
      .then((file: File) => {
        this.fileToUpload = file;
        this.fileNameUrl = this.fileToUpload.name;
        this.fileName = this.fileToUpload.name.split("/").pop();
        console.log("FILE TO UPLOAD ", this.fileToUpload)
      })
      .catch((error: any) => {
        console.error(error);
      });

  }

  createFile(blob: Blob, filename: string): File {
    // Create a new File object from the blob and filename
    return new File([blob], filename, { type: blob.type });
  }


  convertData64ToImage(image64: string) {
    // Get the base64-encoded image from some source (e.g. an API response)
    const base64Image = image64;

    // Extract the data portion of the base64-encoded string
    const data = base64Image.split(',')[1];

    // Decode the base64-encoded data into a binary string
    const binaryString =  window.atob(data);

    // Convert the binary string into an ArrayBuffer
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    // Create a blob from the ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: 'image/png' });

    // Create a new File object from the blob
    this.files[0] = new File([blob], 'image.png', { type: 'image/png' });
  }

  chooseTypeOfClass(type: any) {
    this.typeOfClass = type;
  }

  handleFileInput(files: any) {
    console.log("fileeeeee")
    this.nameOfFile = files.target.files[0].name;
    this.fileToUpload = files.target.files[0];
  }

  handleImageInput(files: any) {
    console.log("FILES ", files)
    const reader = new FileReader();
    // this.nameOfImage = files.target.files[0].name;
    this.imageToUpload = files.addedFiles[0];
    console.log("FILES ", this.imageToUpload)
    // this.files.push(...files.addedFiles)
    this.files[0] = this.imageToUpload;

    if (this.imageToUpload) {
      // reader.readAsDataURL(this.imageToUpload);
      console.log("e agora??", reader.readAsDataURL(this.imageToUpload))
      reader.onload = () => this.imageResult = reader.result;
      console.log("IMAGE LOAD É ESTA ", this.imageResult)
      // this.files.push(...event.addedFiles);
    }
  }

  // submitText() {
  //   const formValue = this.formAddClass.value;
  //
  //   if (!formValue.nameClass || !formValue.textClass || !this.imageResult) {
  //     alert("Please fill all the forms")
  //   } else {
  //     const dataObject = {
  //       titleClass: formValue.nameClass,
  //       textClass: formValue.textClass,
  //       imageClass: this.imageResult,
  //       author: localStorage.getItem('BringUsername')
  //     }
  //
  //     this.authService.uploadText(dataObject).subscribe(data => {
  //       this.router.navigate(['classroom'])
  //     })
  //   }
  // }
  //
  // submitFile() {
  //   if (this.fileToUpload) {
  //     this.authService.uploadFile(this.fileToUpload).subscribe(data => {
  //       this.router.navigate(['classroom'])
  //     })
  //   }
  // }
  fileName: any;

  submitGermanClass() {

    const formValue = this.formAddClass.value;
    console.log("form value ", formValue)
    console.log("image value ", this.imageResult)
    console.log("file value ", this.fileToUpload)

    if(this.imageResult && this.fileToUpload) {
      this.uploadImageAndFile(formValue, this.imageResult, this.fileToUpload)
    } else if(this.imageResult === undefined && this.fileToUpload) {
      this.uploadFileOnly(formValue, this.fileToUpload);
    } else if(this.imageResult && (this.fileToUpload === null || this.fileToUpload === undefined || !this.fileToUpload)) {
      this.uploadImageOnly(formValue, this.imageResult);
    } else {
      this.uploadTextOnly(formValue);
    }
  }

  uploadImageAndFile(formValue: any, imageToUpload: any, fileToUpload: any) {
    // const dataObject = {
    //   titleClass: formValue.nameClass,
    //   textClass: formValue.textClass,
    //   imageClass: imageToUpload,
    //   author: localStorage.getItem('BringUsername')
    // }
    //
    // this.authService.uploadText(dataObject).subscribe(data => {
    //   this.router.navigate(['classroom'])
    // })
    // this.authService.uploadFile(fileToUpload).subscribe(data => {
    //   this.router.navigate(['classroom'])
    // })

    console.log("FUNÇÃO uploadImageAndFile -> ")

    this.authService.uploadFile(fileToUpload).subscribe((data: any) => {

      const fileLocation = data.location

      console.log("DATA DO AWS ", data.location)

      const dataObject = {
        titleClass: formValue.nameClass,
        textClass: formValue.textClass,
        imageClass: imageToUpload,
        fileClass: fileLocation,
        author: localStorage.getItem('BringUsername')
      }

      this.authService.uploadText(dataObject).subscribe(data => {
        this.router.navigate(['classroom'])
      })


    })



  }

  uploadFileOnly(formValue: any, fileToUpload: any) {

    console.log("FUNÇÃO uploadFileOnly -> ")

    this.authService.uploadFile(fileToUpload).subscribe((data: any) => {

      const fileLocation = data.location

      console.log("DATA DO AWS ", data.location)

      const dataObject = {
        titleClass: formValue.nameClass,
        textClass: formValue.textClass,
        fileClass: fileLocation,
        author: localStorage.getItem('BringUsername')
      }

      this.authService.uploadText(dataObject).subscribe(data => {
        this.router.navigate(['classroom'])
      })


    })
  }

  uploadImageOnly(formValue: any, imageToUpload: any) {

    console.log("FUNÇÃO uploadImageOnly -> ", imageToUpload)

    const dataObject = {
      titleClass: formValue.nameClass,
      textClass: formValue.textClass,
      imageClass: imageToUpload,
      author: localStorage.getItem('BringUsername')
    }

    this.authService.uploadText(dataObject).subscribe(data => {
      this.router.navigate(['classroom'])
    })
  }

  uploadTextOnly(formValue: any) {

    console.log("FUNÇÃO uploadTextOnly -> ")


    const dataObject = {
      titleClass: formValue.nameClass,
      textClass: formValue.textClass,
      author: localStorage.getItem('BringUsername')
    }

    this.authService.uploadText(dataObject).subscribe(data => {
      this.router.navigate(['classroom'])
    })
  }




  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    console.log(this.files)
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
