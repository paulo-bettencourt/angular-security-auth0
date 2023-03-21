import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'image-dialog',
  templateUrl: 'image-dialog.html'
})
export class ImageDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
