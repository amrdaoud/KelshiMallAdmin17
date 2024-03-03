import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { campaignFilters } from '../notification.const';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-notification-wizard',
  standalone: true,
  imports: [CommonModule, MatStepperModule, MatGridListModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './notification-wizard.component.html',
  styleUrls: ['./notification-wizard.component.scss']
})
export class NotificationWizardComponent {
  filters = campaignFilters;
  frm: FormGroup;
  constructor() {
    this.frm = new FormGroup({});
    this.filters.forEach(filter => {
      this.frm.addControl(filter.controlName, new FormControl())
    });
  }
}
