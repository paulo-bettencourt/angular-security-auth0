import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent {

  typeOfClass!: any;
  nameOfFile: string = '';
  nameOfImage!: string;
  fileToUpload: File | null = null;
  formAddClass = this.fb.group({
    nameClass: ['', Validators.required],
    textClass: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  chooseTypeOfClass(type: any) {
    this.typeOfClass = type;
  }

  handleFileInput(files: any) {
    this.nameOfFile = files.target.files[0].name;
    this.fileToUpload = files.target.files[0];
  }

  handleImageInput(files: any) {
    this.nameOfImage = files.target.files[0].name;
    this.fileToUpload = files.target.files[0];
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
        this.router.navigate(['classroom'])
      })
    }
  }

  submitFile() {
    if(this.fileToUpload) {
      this.authService.uploadFile(this.fileToUpload).subscribe(data => {
        console.log("FILE UPLOADED");
        this.router.navigate(['classroom'])
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
          this.router.navigate(['classroom'])
        })
      };
    }
  };

}
