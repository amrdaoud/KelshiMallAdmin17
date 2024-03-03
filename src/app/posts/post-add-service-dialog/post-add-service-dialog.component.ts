import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaidService } from '../../paid-services/paid-service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-post-add-service-dialog',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatListModule, MatDialogModule, MatButtonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatDividerModule],
  templateUrl: './post-add-service-dialog.component.html',
  styleUrls: ['./post-add-service-dialog.component.scss']
})
export class PostAddServiceDialogComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public paidServices: PaidService[]){}
 selectedService: PaidService[] = [];
 hours = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
}
