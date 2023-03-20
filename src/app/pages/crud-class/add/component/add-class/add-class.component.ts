import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../../../services/auth.service";
import {Router} from "@angular/router";
import Quill from "quill";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {reduxGermanService} from "../../../../../services/ngrx-german.service";

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html'
})
export class AddClassComponent {

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

  editor: any;
  @ViewChild('editor') editorElement: any;
  @ViewChild('imageUploadDropzone') imageUploadDropzone: any;

  quillConfiguration = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link'],
    ],
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, public dialogRef: MatDialogRef<any>, public dialog: MatDialog, public reduxService: reduxGermanService) {}

  chooseTypeOfClass(type: any) {
    this.typeOfClass = type;
  }

  handleFileInput(files: any) {
    this.nameOfFile = files.target.files[0].name;
    this.fileToUpload = files.target.files[0];
  }

  handleImageInput(files: any) {
    const reader = new FileReader();
    this.imageToUpload = files.addedFiles[0];
    this.files[0] = this.imageToUpload;

    if (this.imageToUpload) {
      reader.readAsDataURL(this.imageToUpload);
      reader.onload = () => this.imageResult = reader.result;
    }
  }

  submitGermanClass() {
    const formValue = this.formAddClass.value;

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
    this.authService.uploadFile(fileToUpload).subscribe((data: any) => {
      const fileLocation = data.location
      const dataObject = {
        titleClass: formValue.nameClass,
        textClass: formValue.textClass,
        imageClass: imageToUpload,
        fileClass: fileLocation,
        author: localStorage.getItem('BringUsername')
      }
      this.reduxService.add(dataObject);
    })
    this.dialog.closeAll()
  }

  uploadFileOnly(formValue: any, fileToUpload: any) {
    this.authService.uploadFile(fileToUpload).subscribe((data: any) => {
      const fileLocation = data.location
      const dataObject = {
        titleClass: formValue.nameClass,
        textClass: formValue.textClass,
        fileClass: fileLocation,
        author: localStorage.getItem('BringUsername')
      }
      this.reduxService.add(dataObject).subscribe(() => this.dialog.closeAll());
    })
  }

  uploadImageOnly(formValue: any, imageToUpload: any) {
    const dataObject = {
      titleClass: formValue.nameClass,
      textClass: formValue.textClass,
      imageClass: imageToUpload,
      author: localStorage.getItem('BringUsername')
    }
    this.reduxService.add(dataObject).subscribe(() => this.dialog.closeAll());
  }

  uploadTextOnly(formValue: any) {
    const dataObject = {
          titleClass: formValue.nameClass,
          textClass: formValue.textClass,
          author: localStorage.getItem('BringUsername')
        }
    this.reduxService.add(dataObject).subscribe(() => this.dialog.closeAll());
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

  cancelUpdate() {
    this.dialog.closeAll();
  }
}
