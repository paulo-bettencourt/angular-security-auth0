import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../../services/auth.service";
import {reduxGermanService} from "../../../../services/ngrx-german.service";

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-class-dialog.html'
})
export class DeleteClassDialog {
  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {id: string},
              private authService: AuthService,
              private reduxService: reduxGermanService,
              public dialog: MatDialog) {}

  delete() {
    this.reduxService.delete(this.data.id);
    this.dialog.closeAll();
  }

  deleteClassById(id: any) {
    this.reduxService.delete(id).subscribe({
      next: () => console.log(""),
      error: (err: any) => console.log("error: ", err)
    });
  };

  cancelDelete() {
    this.dialog.closeAll();
  }
}

