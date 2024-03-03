import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs';
import { UserManagerService } from '../user-manager.service';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { DataTableComponent } from "../../app-reusables/data-table/data-table.component";
import { TransactionService } from '../../transactions/transaction.service';
import { TransactionFilterModel } from '../../transactions/transactions';
import { DataTableButtonObject, DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { transactionConst } from '../../transactions/transaction.const';
import { DeviceService } from '../../app-reusables/services/device.service';
import { MatIconModule } from '@angular/material/icon';
import { MembershipService } from '../../memberships/membership.service';
import { membershipHistoryConst } from '../../memberships/membership.const';
import { MembershipHistoryFilterModel } from '../../memberships/membership';
import { MatButtonModule } from '@angular/material/button';
import { PostService } from '../../posts/post.service';
import { postListColumns, postMenuBtns } from '../../posts/post.const';
import { Post, PostFilterModel } from '../../posts/post';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MembershipAddComponent } from '../membership-add/membership-add.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../../app-reusables/account/services/account.service';
import { MatMenuModule } from '@angular/material/menu';
import { SmsDialogComponent } from '../sms-dialog/sms-dialog.component';
import { NgImageSliderModule } from 'ng-image-slider';

@Component({
    selector: 'app-user-info',
    standalone: true,
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
    imports: [CommonModule, MatGridListModule, MatCardModule,
      MatFormFieldModule, MatInputModule, LocaleDatePipe,
      DataTableComponent, MatIconModule, MatButtonModule,
      MatProgressSpinnerModule,NgImageSliderModule, MatDividerModule, MatMenuModule],
    providers: [LocaleDatePipe, CurrencyPipe]
})
export class UserInfoComponent extends Unsubscriber{
  userId: string = '';
  backgroundPictures: { image: string; thumbImage?: string; alt?: string; title: string; }[] = [];
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private mainService = inject(UserManagerService);
  private deviceService = inject(DeviceService);
  private transactionService = inject(TransactionService);
  private membershipService = inject(MembershipService);
  private postService = inject(PostService);
  private confirm = inject(ConfirmService);
  private dialog = inject(MatDialog);
  private account = inject(AccountService);
  canChange = this.account.inRoles(['Membership Manager','Super User'])
  canSendNotifications = this.account.inRoles(['Super User', 'Notification Manager'])
  transactionData: any[] = [];
  transactionDataSize!: number;
  membershipData: any[] = [];
  membershipDataSize!: number;
  membershipFilter!: DataTableOutput;
  membershipBtns: DataTableButtonObject[] = [
    {Text: 'Change Membership', Icon: 'card_membership', MatColor: 'primary'}
  ]
  postData: any[] = [];
  postDataSize!: number;
  postMenuBtns = this.canSendNotifications ?  postMenuBtns : [];
  transactionLoading$ = this.transactionService.loadingList$;
  membershipLoading$ = this.membershipService.loadingList$;
  postLoading$ = this.postService.loadingGetPostsByFiter$;
  isActive = false;
  userActivating = this.mainService.loadingActivation$.pipe(map(x => x.length > 0));
  
  transactionColumnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return transactionConst.columns.filter(x => !x.HideHandset)
        }
        return transactionConst.columns
    })
  );

  membershipColumnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return membershipHistoryConst.columns.filter(x => !x.HideHandset)
        }
        return membershipHistoryConst.columns
    })
  );
  postColumnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return postListColumns.filter(x => !x.HideHandset)
        }
        return postListColumns
    })
  );

  user$ = this.route.paramMap.pipe(
    filter((paramMap:ParamMap) => paramMap.has('id')),
    map((paramMap: ParamMap) => paramMap.get('id')),
    tap(id => this.userId = id!),
    switchMap((userId: string | null) => this.mainService.getUsersByFilter({PageIndex:0,PageSize:1,UserId:userId ?? '0', SortActive: 'UserId', SortDirection: 'asc'})),
    tap(user => {
      this.isActive = user.data[0]?.isActive;
    }),
    tap(user => {
      this.backgroundPictures = (user.data[0]?.backgroundPictures as string[]).map(x => {
        return {image: x, thumbImage: x, title: '', alt: ''}
      })
    }),
    map(result => result.data[0])
  );
  loading$ = this.mainService.loadingList$;
  transactionTableChange(filter: DataTableOutput) {
    this._otherSubscription = this.transactionService.getTransactionsByFilter({...filter as TransactionFilterModel, UserId: this.userId})
        .subscribe(ds => {
            this.transactionData = ds.data;
            this.transactionDataSize = ds.dataSize;
        })
  }
  transactionDownload(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.transactionService.exportTransactionsByFilter({...filter as TransactionFilterModel, UserId: this.userId}).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `Transactions-${this.userId}-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }

  membershipTableChange(filter: DataTableOutput) {
    this.membershipFilter = filter;
    this._otherSubscription = this.membershipService.getMembershipHistoryByFilter({...filter as MembershipHistoryFilterModel, UserId: this.userId})
        .subscribe(ds => {
            this.membershipData = ds.data;
            this.membershipDataSize = ds.dataSize;
        })
  }
  membershipDownload(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.membershipService.exportMembershipHistoryByFilter({...filter as MembershipHistoryFilterModel, UserId: this.userId}).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `Membership-${this.userId}-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }

  postTableChange(filter: DataTableOutput) {
    this._otherSubscription = this.postService.getPostsByFilter({...filter as PostFilterModel, UserId: this.userId})
        .subscribe(ds => {
            this.postData = ds.data;
            this.postDataSize = ds.dataSize;
        })
  }
  postDownload(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.postService.exportPostsByFilter({...filter as PostFilterModel, UserId: this.userId}).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `Posts-${this.userId}-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }
  deactivateUser() {
    this.confirm.open({Message: 'Are you sure you want to deactivate this user?', MatColor:'warn'})
    .pipe(
      filter(result => result),
      switchMap(() => this.mainService.deactivateUser(this.userId, 0))
    ).subscribe(result => {
      if(result) {
        this.isActive = false;
        this.router.navigateByUrl('user-manager');
      }
    })
  }
  activateUser() {
    this.confirm.open({Message: 'Are you sure you want to activate this user?'})
    .pipe(
      filter(result => result),
      switchMap(() => this.mainService.activateUser(this.userId, 0))
    ).subscribe(result => {
      if(result) {
        this.isActive = true;
        this.router.navigateByUrl('user-manager');
      }
    })
  }
  goToPost(post: Post) {
    this.router.navigate([`/posts/${post.postId}`], {queryParams: {returnUrl: this.router.url}})
  }
  goToPostNew(post: Post) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/posts/${post.postId}`])
    );
  
    window.open(url, '_blank');
  }
  postMenuBtnClicked(object: {index: number, obj: Post, objIndex: number}) {
    if(object.index == 0) {
      this.router.navigate(['/notification-manual'], {queryParams: {userId: [object.obj.userId], title: object.obj.title, postId: object.obj.postId, route: 'adDetailsScreen', myPost: true}})
    }
    else if(object.index == 1) {
      this.router.navigate(['/notification-manual'], {queryParams: {isExclude: true, userId: [object.obj.userId], title: object.obj.title, postId: object.obj.postId, route: 'adDetailsScreen', myPost: false, body: object.obj.description}})
    }
  }
  membershipBtnClicked(index: number) {
    if(index == 0) {
      this.dialog.open(MembershipAddComponent, {data: this.userId}).afterClosed().subscribe(result => {
        if(result) {
          this.membershipTableChange(this.membershipFilter);
        }
      })
    }
  }
  sendNotification(userId: number, storeName: string, storeId: number) {
    this.router.navigate(['/notification-manual'], {queryParams: {userId: [userId], title: storeName, storeId: storeId, route: 'storeScreen'}})
  }
  sendNotificationOthers(userId: number, storeName: string, storeId: number) {
    this.router.navigate(['/notification-manual'], {queryParams: {isExclude: true, userId: [userId], title: storeName, storeId: storeId, route: 'storeScreen'}})
  }
  sendSms(mobileNumber: string) {
    this.dialog.open(SmsDialogComponent, {data: [mobileNumber]});
  }

}
