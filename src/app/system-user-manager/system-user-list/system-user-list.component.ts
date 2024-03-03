import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { DeviceService } from '../../app-reusables/services/device.service';
import { systemUserManagerConst } from '../system-user-manager.const';
import { filter, map, switchMap } from 'rxjs';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { SystemUserFilterModel, SystemUserListViewModel } from '../system-user-manager';
import { DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { SystemUserManagerService } from '../system-user-manager.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../app-reusables/account/components/change-password/change-password.component';
import { UserChangePasswordFormComponent } from '../user-change-password-form/user-change-password-form.component';
import { UserRolesDialogComponent } from '../user-roles-dialog/user-roles-dialog.component';
import { UsersFormComponent } from '../users-form/users-form.component';
import { UserDeliveryDialogComponent } from '../user-delivery-dialog/user-delivery-dialog.component';

@Component({
  selector: 'app-system-user-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, DataTableComponent],
  templateUrl: './system-user-list.component.html',
  styleUrls: ['./system-user-list.component.scss'],
  providers: [LocaleDatePipe]
})
export class SystemUserListComponent extends Unsubscriber {
  private mainService = inject(SystemUserManagerService);
  private confirm = inject(ConfirmService);
  private deviceService = inject(DeviceService);
  private dialog = inject(MatDialog)
  isLoading$ = this.mainService.loadingList$;
  isDownloading$ = this.mainService.loadingListDownload$;
  isMenuLoading$ = this.mainService.loadingActivation$;
  columnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return systemUserManagerConst.columns.filter(x => !x.HideHandset)
        }
        return systemUserManagerConst.columns
    })
  );
  menuButtons = systemUserManagerConst.menuButtons;
  btns = systemUserManagerConst.btns;
  data: any[] = [];
  dataSize!: number;
  tableChange(filter: DataTableOutput) {
    this._otherSubscription = this.mainService.getUsersByFilter(filter as SystemUserFilterModel)
        .subscribe(ds => {
            this.data = ds.data;
            this.dataSize = ds.dataSize;
        })
  }
  download(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.mainService.exportUsersByFilter(filter as SystemUserFilterModel).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `SystemUsers-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }
  tableMenuClicked(menuClickObject:{index: number, obj: SystemUserListViewModel, objIndex: number}) {

    if(menuClickObject.index == 0) {
      this._otherSubscription = this.dialog.open(UserRolesDialogComponent, {panelClass: 'mini-width-dialog', data: {user: menuClickObject.obj, rowIndex: menuClickObject.objIndex }})
      .afterClosed()
      .subscribe(result => {
        if(result) {
          this.data[menuClickObject.objIndex] = {...this.data[menuClickObject.objIndex], roles: result}
          this.data = [...this.data]
        }
      })
    } else if(menuClickObject.index == 1) {
      this.confirm.open({Message: 'Are you sure you want to activate '+ menuClickObject.obj.username + '?'})
      .pipe(
        filter(result => result),
        switchMap(() => this.mainService.activateUser(menuClickObject.obj.systemUserId, menuClickObject.objIndex))
      ).subscribe(result => {
        if(result) {
          this.data[menuClickObject.objIndex] = {...this.data[menuClickObject.objIndex], isActive: true}
          this.data = [...this.data]
        }
      })
    } else if(menuClickObject.index == 2) {
      this.confirm.open({Message: 'Are you sure you want to deactivate '+ menuClickObject.obj.username + '?', MatColor: 'warn'})
      .pipe(
        filter(result => result),
        switchMap(() => this.mainService.deactivateUser(menuClickObject.obj.systemUserId, menuClickObject.objIndex))
      ).subscribe(result => {
        if(result) {
          this.data[menuClickObject.objIndex] = {...this.data[menuClickObject.objIndex], isActive: false}
          this.data = [...this.data]
        }
      })
    }
    else if(menuClickObject.index == 3) {
      this.dialog.open(UserChangePasswordFormComponent , { panelClass: 'form-dialog', data: {userId: menuClickObject.obj.systemUserId, rowIndex: menuClickObject.objIndex } });
    }
    else if(menuClickObject.index == 4) {
      this._otherSubscription = this.dialog.open(UserDeliveryDialogComponent, {panelClass: 'mini-width-dialog', data: {user: menuClickObject.obj, rowIndex: menuClickObject.objIndex }})
      .afterClosed()
      .subscribe(result => {
        if(result) {
          this.data[menuClickObject.objIndex] = {...this.data[menuClickObject.objIndex], deliveryProviderIds: result}
          this.data = [...this.data]
        }
      })
    }
  }

  buttonClicked(i: number) {
    if (i === 0) {
      this._otherSubscription = this.dialog.open(UsersFormComponent, {minWidth: '500px'}).afterClosed().pipe(
        filter(retData => retData),
      ).subscribe(retData => {
        this.data.push(retData.data);
        this.data = [...this.data]
      })
    }
  }
}
