import {Component} from '@angular/core';
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
    textClass: ['', Validators.required],
    imageClass: ['', Validators.required]
  })
  imageResult: string | ArrayBuffer | null | undefined;

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
    const reader = new FileReader();
    this.nameOfImage = files.target.files[0].name;
    this.fileToUpload = files.target.files[0];

    if (this.fileToUpload) {
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => this.imageResult = reader.result;
    }
  }

  submitText() {
    const formValue = this.formAddClass.value;

    if (!formValue.nameClass || !formValue.textClass || !this.imageResult) {
      alert("Please fill all the forms")
    } else {
      const dataObject = {
        titleClass: formValue.nameClass,
        textClass: formValue.textClass,
        imageClass: this.imageResult,
        author: localStorage.getItem('BringUsername')
      }

      this.authService.uploadText(dataObject).subscribe(data => {
        this.router.navigate(['classroom'])
      })
    }
  }

  submitFile() {
    if (this.fileToUpload) {
      this.authService.uploadFile(this.fileToUpload).subscribe(data => {
        this.router.navigate(['classroom'])
      })
    }
  }
}


