import {Component, Input} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../../interfaces/user.interface";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  handleFileInput(files: any) {
    this.nameOfFile = files.target.files[0].name;
    this.fileToUpload = files.target.files[0];
  }

  addNewClass() {
    this.isNewClass = !this.isNewClass;
  }

  chooseTypeOfClass(type: any) {
    this.typeOfClass = type;
  }

  submitText() {
    if(this.fileToUpload) {
      this.authService.uploadFile(this.fileToUpload).subscribe(data => {
        console.log("FILE UPLOADED")
      })
    }
  }

  submitFile() {
    if(this.fileToUpload) {
      this.authService.uploadFile(this.fileToUpload).subscribe(data => {
        console.log("FILE UPLOADED")
      })
    }
  }

  submitImage() {
    if(this.fileToUpload) {
      this.authService.uploadImage(this.fileToUpload).subscribe(data => {
        console.log("FILE UPLOADED")
      })
    }
  }
}
