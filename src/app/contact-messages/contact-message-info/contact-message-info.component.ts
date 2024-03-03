import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ContactMessageListViewModel } from '../contact-message';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-contact-message-info',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatButtonModule, LocaleDatePipe, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './contact-message-info.component.html',
  styleUrls: ['./contact-message-info.component.scss'],
})
export class ContactMessageInfoComponent {
  private dialogRef = inject(MatDialogRef<ContactMessageInfoComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public message: ContactMessageListViewModel){}
  unread() {
    this.message.status = 'Unread';
    this.dialogRef.close('Unread');
  }
  read() {
    this.message.status = 'Read';
    this.dialogRef.close('Read');
  }
  openAttach() {
    if(this.message.attachmentUrl) {
      window.open(this.message.attachmentUrl, '_blank')
    }
    
  }
}
