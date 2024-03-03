import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-status-reason',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule, FormsModule, MatDividerModule, MatButtonModule],
  templateUrl: './post-status-reason.component.html',
  styleUrls: ['./post-status-reason.component.scss']
})
export class PostStatusReasonComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public statusReason: string) { }
  private dialogRef = inject(MatDialogRef<PostStatusReasonComponent>)
  close() {
    this.dialogRef.close(this.statusReason);
  }
}
