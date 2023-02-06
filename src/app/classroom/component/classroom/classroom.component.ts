import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../../interfaces/user.interface";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent {

  isNewClass: boolean = false;

  formAddClass = this.fb.group({
    nameClass: ['', Validators.required],
    textClass: ['', Validators.required]
  })
  data!: any;
  typeOfClass!: any;
  fileToUpload: File | null = null;
  nameOfFile: string = '';
  nameOfImage!: string;
  allClasses$: any;
  allImages$: any;
  allFiles$: any;
  isText: boolean = false;
  isFiles: boolean = false;
  isImages: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.allClasses$ = this.authService.getClasses();
    this.allImages$ = this.authService.getImages();
    this.allFiles$ = this.authService.getFiles();

    this.authService.getFiles().subscribe((data: any) => {
      console.log("DATA->", data.Contents)
      this.allFiles$ = data.Contents
    })
  }

  handleFileInput(files: any) {
    this.nameOfFile = files.target.files[0].name;
    this.fileToUpload = files.target.files[0];
  }

  handleImageInput(files: any) {
    this.nameOfImage = files.target.files[0].name;
    this.fileToUpload = files.target.files[0];
  }

  addNewClass() {
    this.isNewClass = !this.isNewClass;
    this.isImages = false;
    this.isText = false;
    this.isFiles = false;
  }

  chooseTypeOfClass(type: any) {
    this.typeOfClass = type;
  }

  submitText() {
    const formValue = this.formAddClass.value;

    if(formValue.nameClass && formValue.textClass) {

      const dataObject = {
        titleClass: formValue.nameClass,
        textClass: formValue.textClass
      }

      this.authService.uploadText(dataObject).subscribe(data => {
        console.log("FILE UPLOADED");
        this.isNewClass = false;
        this.isText = true;
        this.isFiles = false;
        this.isImages = false;
      })
    }
  }

  submitFile() {
    if(this.fileToUpload) {
      this.authService.uploadFile(this.fileToUpload).subscribe(data => {
        console.log("FILE UPLOADED");
        this.isNewClass = false;
        this.isText = false;
        this.isFiles = true;
        this.isImages = false;
      })
    }
  }

  submitImage() {
    const reader = new FileReader();
    if(this.fileToUpload) {
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => {
        this.authService.uploadImage64(reader.result).subscribe(data => {
          console.log("FILE UPLOADED");
          this.isNewClass = false;
          this.isText = false;
          this.isFiles = false;
          this.isImages = true;
        })
      };
    }
  };


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
}
