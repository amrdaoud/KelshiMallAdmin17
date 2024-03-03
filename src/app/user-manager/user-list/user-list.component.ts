import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { UserManagerService } from '../user-manager.service';
import { Router } from '@angular/router';
import { DeviceService } from '../../app-reusables/services/device.service';
import { filter, map, switchMap } from 'rxjs';
import { userManagerConst } from '../user-manager.const';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { DataTableFilter, DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { UserFilterModel, UserListViewModel } from '../user-manager';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { MembershipService } from '../../memberships/membership.service';
import { GenericService } from '../../app-services/generic.service';
import { MatDialog } from '@angular/material/dialog';
import { SmsDialogComponent } from '../sms-dialog/sms-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../app-reusables/account/services/account.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, DataTableComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [CurrencyPipe, LocaleDatePipe]
})
export class UserListComponent extends Unsubscriber {
  private mainService = inject(UserManagerService);
  private router = inject(Router);
  private confirm = inject(ConfirmService);
  private deviceService = inject(DeviceService);
  private membershipService = inject(MembershipService);
  private genericService = inject(GenericService);
  private snackBar = inject(MatSnackBar);
  private account = inject(AccountService);
  private smsDialog = inject(MatDialog);
  isSuperUser = this.account.inRoles(['Super User']);
  canSendNotifications = this.account.inRoles(['Super User', 'Notification Manager']);
  isLoading$ = this.mainService.loadingList$;
  isDownloading$ = this.mainService.loadingListDownload$;
  isMenuLoading$ = this.mainService.loadingActivation$;
  columnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return userManagerConst.columns.filter(x => !x.HideHandset)
        }
        return userManagerConst.columns
    })
  );
  extraFilters: DataTableFilter[] = [
    {
      Type: 'select',
      ControlName: 'MembershipIds',
      DisplayProperty: 'name',
      ValueProperty: 'membershipId',
      PlaceHolder: 'Membership',
      UpdateOn: 'blur',
      IsMulti: true,
      Data: this.membershipService.getMemberships(),
      IsLoading: this.membershipService.loading$
    },
    {
      Type: 'select',
      ControlName: 'Cities',
      DisplayProperty: 'nameAr',
      ValueProperty: 'nameAr',
      PlaceHolder: 'City',
      UpdateOn: 'blur',
      IsMulti: true,
      Data: this.genericService.cities$
    },
  ]
  filters = [...userManagerConst.filters!,...this.extraFilters];
  menuButtons = userManagerConst.menuButtons;
  selectButtons = userManagerConst.selectBtns;
  btns = userManagerConst.buttons;
  data: any[] = [];
  dataSize!: number;
  constructor(){
    super();
    if(this.canSendNotifications) {
      this.menuButtons?.push(
        {
          Text: 'Send user notification',
          Icon: 'notifications',
          MatColor: 'primary',
      },
      {
          Text: 'Notify others about store',
          Icon: 'notifications',
          MatColor: 'warn',
          ShowWhen: {
              Property: 'isActive',
              Value: true
          }
      }
      );
    }
  }
  tableChange(filter: DataTableOutput) {
    this._otherSubscription = this.mainService.getUsersByFilter(filter as UserFilterModel)
        .subscribe(ds => {
            this.data = ds.data;
            this.dataSize = ds.dataSize;
        })
  }
  download(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.mainService.exportUsersByFilter(filter as UserFilterModel).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `Users-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }
  tableMenuClicked(menuClickObject:{index: number, obj: UserListViewModel, objIndex: number}) {
    if(menuClickObject.index == 0) {
      this._otherSubscription = this.confirm.open({Message: 'Are you sure you want to activate '+ menuClickObject.obj.storeName + '?'})
      .pipe(
        filter(result => result),
        switchMap(() => this.mainService.activateUser(menuClickObject.obj.userId, menuClickObject.objIndex))
      ).subscribe(result => {
        if(result) {
          this.data[menuClickObject.objIndex] = {...this.data[menuClickObject.objIndex], isActive: true}
          this.data = [...this.data]
        }
      })
    } else if(menuClickObject.index == 1) {
      this._otherSubscription = this.confirm.open({Message: 'Are you sure you want to deactivate '+ menuClickObject.obj.storeName + '?'})
      .pipe(
        filter(result => result),
        switchMap(() => this.mainService.deactivateUser(menuClickObject.obj.userId, menuClickObject.objIndex))
      ).subscribe(result => {
        if(result) {
          this.data[menuClickObject.objIndex] = {...this.data[menuClickObject.objIndex], isActive: false}
          this.data = [...this.data]
        }
      })
    } else if(menuClickObject.index == 2) {
      this.router.navigate(['/notification-manual'], {queryParams: {userId: [menuClickObject.obj.userId], title: menuClickObject.obj.storeName, storeId: menuClickObject.obj.storeId, route: 'storeScreen'}})
    } else if(menuClickObject.index == 3) {
      this.router.navigate(['/notification-manual'], {queryParams: {isExclude: true, userId: [menuClickObject.obj.userId], title: menuClickObject.obj.storeName, storeId: menuClickObject.obj.storeId, route: 'storeScreen'}})
    }
  }
  selectBtnClicked(selectClickObject: {index: number,objs: any[]}) {
    if(selectClickObject.index === 0) {
      this.smsDialog.open(SmsDialogComponent, {data: selectClickObject.objs.map(x => x.mobileNumber)});
    }
    
  }
  goToInfo(user: UserListViewModel) {
    this.router.navigateByUrl('user-manager/'+user.userId);
  }
  goToInfoNew(user: UserListViewModel) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`user-manager/${user.userId}`])
    );
  
    window.open(url, '_blank');
  }
  buttonClicked(index: number) {
    if(index === 0) {
      this._otherSubscription = this.confirm.open({Message: 'All users will be asked to re-accept policy, do you want to proceed?'}).pipe(
        filter(result => result),
        switchMap(() => this.mainService.policyRequest())
      ).subscribe(x => {
        if(x) {
          this.snackBar.open('All users have to re-accept policy now', 'Dismiss', {duration: 3000})
        }
      });
    }
  }

}
