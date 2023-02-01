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

  form = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  })
  data!: User;
  typeOfClass!: any;
  fileToUpload: File | null = null;
  nameOfFile: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  handleFileInput(files: any) {
    console.log("FILES", files.target.files[0].name);
    this.nameOfFile = files.target.files[0].name;
    this.fileToUpload = files.target.files[0];
  }

  addNewClass() {
    this.isNewClass = !this.isNewClass;
  }

  chooseTypeOfClass(type: any) {
    this.typeOfClass = type;
  }


  submit() {
    const login = this.form.controls['login'].value;
    const password = this.form.controls['password'].value;
    console.log("-->", this.form.controls['login'].value)
    if(login && password) {
      this.data = {
        login: login,
        password: password
      }
    }
    console.log("payload", this.data)
    this.authService.signup(this.data).subscribe(data => {
      this.authService.isLogged = true;
      this.router.navigate(['classroom'])
    })
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
