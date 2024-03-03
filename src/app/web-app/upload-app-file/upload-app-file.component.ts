import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { filter, switchMap } from 'rxjs';
import { GenericService } from '../../app-services/generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-app-file',
  standalone: true,
  imports: [CommonModule, MatGridListModule,MatCardModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './upload-app-file.component.html',
  styleUrls: ['./upload-app-file.component.scss']
})
export class UploadAppFileComponent extends Unsubscriber {
  private confirm = inject(ConfirmService);
  private genericService = inject(GenericService);
  private snackBar = inject(MatSnackBar);
  uploading$ = this.genericService.loadingUpload$;
  frm = new FormGroup({
    appFile: new FormControl(null, Validators.required)
  })
  submit() {
    if(this.frm.invalid) {
      return;
    }
    this._otherSubscription = this.confirm.open({Message: 'Are you sure you want to upload this file'}).pipe(
      filter(result => result),
      switchMap(() => this.genericService.uploadFile(this.frm.value))
    ).subscribe(x => {
      this.frm.get('appFile')?.setValue(null);
      if(x) {
        this.snackBar.open('File uploaded successfully', 'Dismiss', {duration: 2000})
      }
    });
  }
  previewFile(event: any) {
    if(!event.target?.files || event.target?.files.length === 0) {
      return;
    }
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      
    };
    reader.readAsDataURL(selectedFile);
    this.frm.get('appFile')?.setValue(selectedFile);
  }
}
