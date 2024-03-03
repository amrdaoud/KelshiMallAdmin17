import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { DeviceService } from '../../app-reusables/services/device.service';
import { InputComponent } from '../../app-reusables/controls/input/input.component';
import { SelectComponent } from '../../app-reusables/controls/select/select.component';
import { SystemUserManagerService } from '../system-user-manager.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule, InputComponent, MatGridListModule, ReactiveFormsModule, SelectComponent, MatDividerModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent extends Unsubscriber {
  private mainService = inject(SystemUserManagerService);
  private dialogRef = inject(MatDialogRef<UsersFormComponent>);
  private deviceService = inject(DeviceService);
  isHandset$ = this.deviceService.isHandset$;
  roles$ = this.mainService.getRoles()
          .pipe(
            map(x =>  {
              return x.map(c => {return {Name: c}})
            })
          );
  loadingRoles$ = this.mainService.loadingRoles$;
  loadingForm$ = this.mainService.loadingRegister$;
  frm!: FormGroup;
  constructor(){
    super();
    this.frm = this.mainService.createRegisterForm();
  }
  submit() {
    if(this.frm.invalid) {
      return;
    }
    this._otherSubscription = this.mainService.register(this.frm.value).subscribe(x => {
      if(x) {
        this.dialogRef.close({action: 'add', data: x})
      }
    });
  }
  reset() {
    this.frm.reset();
  }
}
