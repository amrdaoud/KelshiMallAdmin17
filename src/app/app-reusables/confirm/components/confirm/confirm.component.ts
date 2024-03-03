import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ConfirmModel } from '../../models/confirm.models';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule, MatDividerModule],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data?: ConfirmModel) {}

}
