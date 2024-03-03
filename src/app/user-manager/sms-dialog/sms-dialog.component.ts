import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { UserManagerService } from '../user-manager.service';
import { Languages } from '../../app-models/generic';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-sms-dialog',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatDividerModule, MatListModule, FormsModule, MatMenuModule, MatIconModule, MatProgressBarModule],
  templateUrl: './sms-dialog.component.html',
  styleUrls: ['./sms-dialog.component.scss']
})
export class SmsDialogComponent {
  selectedData: string[];
  body: string = '';
  language: Languages = Languages.AR;
  dialogRef = inject(MatDialogRef<SmsDialogComponent>);
  userManagerService = inject(UserManagerService);
  loading$ = this.userManagerService.loadingSendSms$;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string[]) {
    this.selectedData = data;
  }
  sendSms() {
    this.userManagerService.sendSms({MobileNumbers: this.selectedData, Body: this.body, Language: this.language}).subscribe(
      x => {
        if(x) {
          this.dialogRef.close(x);
        }
      }
    );
  }
}
