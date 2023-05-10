import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { reduxGermanService } from '../../../services/ngrx-german.service';
import { EditClassDialog } from '../edit/edit-class-dialog.component';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule,
    NgxDropzoneModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-class.component.html',
})
export class AddClassComponent {
  typeOfClass!: any;
  nameOfFile: string = '';
  nameOfImage!: string;
  fileToUpload: File | null = null;
  youtubeIdPattern = /^[a-zA-Z0-9_-]{11}$/;
  youtubeIdValidator = Validators.pattern(this.youtubeIdPattern);
  formAddClass = this.fb.group({
    nameClass: ['', Validators.required],
    textClass: ['', Validators.required],
    imageClass: ['', Validators.required],
    youtubeID: ['', [Validators.required, this.youtubeIdValidator]],
  });
  imageResult: string | ArrayBuffer | null | undefined;
  imageToUpload!: any;
  files: File[] = [];
  editor: any;
  @ViewChild('editor') editorElement: any;
  @ViewChild('imageUploadDropzone') imageUploadDropzone: any;
  @ViewChild('buttonAddGermanClass') buttonAddGermanClassRef =
    {} as ElementRef<HTMLButtonElement>;

  quillConfiguration = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link'],
    ],
  };

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    public reduxService: reduxGermanService,
    private snackBar: MatSnackBar
  ) {}

  handleImageInput(files: any) {
    const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB in bytes
    const reader = new FileReader();
    const imageToUpload = files.addedFiles[0];

    if (imageToUpload.size > MAX_IMAGE_SIZE) {
      // If the image is too large, show an error message and don't process it
      this.snackBar.open(
        "Images can't be over 1MB. Please upload a smaller file",
        undefined,
        {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        }
      );
      return;
    }

    // Store the selected image and display a preview
    this.imageToUpload = imageToUpload;
    this.files[0] = this.imageToUpload;
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = () => (this.imageResult = reader.result);
  }

  submitGermanClass() {
    const formValue = this.formAddClass.value;
    this.buttonAddGermanClassRef.nativeElement.disabled = true;
    this.dialog.closeAll();

    const dataObject = {
      titleClass: formValue.nameClass,
      textClass: formValue.textClass,
      imageClass: this.imageResult,
      youtube: formValue.youtubeID,
      author: localStorage.getItem('BringUsername'),
    };

    this.reduxService.add(dataObject).subscribe((res) => {
      res;
      this.dialog.closeAll();
    });
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  cancelUpdate() {
    this.dialog.closeAll();
  }
}
