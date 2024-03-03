import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PostService } from '../post.service';
import { GenericService } from '../../app-services/generic.service';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, filter, map, merge, of, switchMap, tap } from 'rxjs';
import { Post, PostData } from '../post';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { InputComponent } from "../../app-reusables/controls/input/input.component";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectComponent } from '../../app-reusables/controls/select/select.component';
import { Field } from '../../app-models/generic';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { DeviceService } from '../../app-reusables/services/device.service';
import { MatIconModule } from '@angular/material/icon';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { PaidServiceService } from '../../paid-services/paid-service.service';
import { paidServiceConst } from '../../paid-services/paid-service.const';
import { DataTableButtonObject, DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { Location } from '@angular/common'
import { PaidService, PaidServiceHistoryFilterModel, PaidServiceHistoryListViewModel } from '../../paid-services/paid-service';
import { DataTableComponent } from "../../app-reusables/data-table/data-table.component";
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { PostStatusReasonComponent } from '../post-status-reason/post-status-reason.component';
import { PostStatsService } from '../../post-stats/post-stats.service';
import { postStatsConst } from '../../post-stats/post-stats.const';
import { PostStatsFilterModel } from '../../post-stats/post-stats';
import { PostAddServiceDialogComponent } from '../post-add-service-dialog/post-add-service-dialog.component';
import { AccountService } from '../../app-reusables/account/services/account.service';
import { MatMenuModule } from '@angular/material/menu';
import { SmsDialogComponent } from '../../user-manager/sms-dialog/sms-dialog.component';

@Component({
    selector: 'app-post-form',
    standalone: true,
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.scss'],
    imports: [CommonModule, MatGridListModule, MatCardModule,
        ReactiveFormsModule, InputComponent, SelectComponent, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatDividerModule, MatRadioModule, MatListModule, MatInputModule,
        MatButtonModule, NgImageSliderModule, DataTableComponent, MatProgressSpinnerModule, MatMenuModule],
    providers: [LocaleDatePipe, CurrencyPipe]
})
export class PostFormComponent extends Unsubscriber {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private paidServiceService = inject(PaidServiceService);
  private statsService = inject(PostStatsService);
  private genericService = inject(GenericService);
  private deviceService = inject(DeviceService);
  private snackBar = inject(MatSnackBar);
  private confirm = inject(ConfirmService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private location = inject(Location);
  private account = inject(AccountService);
  canChange = this.account.inRoles(['Super User', 'Post Service Manager']);
  canSendNotifications = this.account.inRoles(['Super User', 'Notification Manager']);
  private selectedService!: PaidService;
  private selectedHour = 0;
  loading$ = this.postService.loadingPost$;
  isHandset$ = this.deviceService.isHandset$;
  post!: Post;
  categoryControl = new FormControl();
  categories$ = this.genericService.categories$;
  postData!:Array<FormGroup>;
  postFields: Field[] = [];
  postAttachements: { image: string; thumbImage?: string; alt?: string; title: string; }[] = [];
  paidServiceData: any[] = [];
  paidServiceDataSize!: number;
  paidServiceMenuButtons = paidServiceConst.menuButtons;
  paidServiceLoadingActivation$ = this.paidServiceService.loadingActivation$;
  paidServiceLoading$ = this.paidServiceService.loadingList$;
  lastPaidServiceFilter!: DataTableOutput;
  paidServiceHistoryColumnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return paidServiceConst.columns.filter(x => !x.HideHandset)
        }
        return paidServiceConst.columns
    })
  );
  paidServicesBtns: DataTableButtonObject[] = [
    {
      Text: 'Add Service',
      Icon: 'add',
      MatColor: 'primary'
    }
  ]
  postStatsData: any[] = [];
  postStatsDataSize!: number;
  postStatsMenuButtons = postStatsConst.menuButtons;
  postStatsLoading$ = this.statsService.loadingList$;
  postStatsColumnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return postStatsConst.columns.filter(x => !x.HideHandset)
        }
        return postStatsConst.columns
    })
  );

  subCategories$ = merge(this.categories$, this.categoryControl.valueChanges).pipe(
    switchMap(v => this.categories$)
  ).pipe(
    map(c => c.find(x => x.categoryId == this.categoryControl.value)?.inverseParentCategory)
  )
  cities$ = this.genericService.cities$;
  private selectedCity = new BehaviorSubject<string>('');
  areas$ = merge(this.cities$,this.selectedCity).pipe(
    switchMap(v => this.cities$)
    ).pipe(
      map(c => c.find(x => x.nameAr == this.selectedCity.value)?.inverseParentArea)
    )
  returnUrl = this.route.snapshot.queryParams["returnUrl"];
  frm$ = this.route.paramMap.pipe(
    switchMap((param: ParamMap) => {
      if(param.has('postId')) {
        return this.postService.getPostById(+param?.get('postId')!).pipe(
          tap(p => this.categoryControl.setValue(p.parentCategoryId)),
          tap(() => this.categoryControl.disable()),
          tap(p => this.selectedCity.next(p.city)),
          tap(p => this.post = p),
          tap(p => this.postAttachements = this.post.postAttachment.map(x => {
            return {
              image: x.attachment.url,
              thumbImage: x.attachment.url,
              alt: '',
              title: x.attachment.isPrimary ? 'Primary' : ''
            }
          }))
        )
      }
      else {
        return of(undefined)
      }
    }),
    switchMap((p: Post | undefined) => {
      if(p) {
        return this.genericService.getFieldsByCategory(p.categoryId);
      }
      else {
        return of([])
      }
    }),
    map(fields => {
      this.postFields = fields;
      return this.postService.createPostForm(fields, this.post)
    }),
    tap(x => this.postData = (x.get('PostData') as FormArray).controls as Array<FormGroup>),
    tap(x => x.get('Title')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => this.postService.changePostTitle(this.post.postId, val))
    ).subscribe(x => {
      if(x) {
        this.snackBar.open('Post Title updated with ' + x.title,'Dismiss', {duration: 2000, verticalPosition:'top'})
      }
    })
    ),
    tap(x => x.get('Price')?.valueChanges.pipe(
      filter(() => x.get('Price')?.valid === true),
      debounceTime(800),
      distinctUntilChanged(),
      switchMap(val => this.postService.changePostPrice(this.post.postId, +val))
    ).subscribe(x => {
      if(x) {
        this.snackBar.open('Post Price updated with ' + x.price,'Dismiss', {duration: 2000, verticalPosition:'top'})
      }
    })
    ),
    tap(x => x.get('Description')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => this.postService.changePostDescription(this.post.postId, val))
    ).subscribe(x => {
      if(x) {
        this.snackBar.open('Post Description updated with ' + x.description,'Dismiss', {duration: 2000, verticalPosition:'top'})
      }
    })
    )
  )
  setCity(name: string) {
    this.selectedCity.next(name);
  }
  goToUser() {
    this.router.navigateByUrl("/user-manager/" + this.post.userId)
  }
  paidServiceTableChanged(filter: DataTableOutput) {
    this.lastPaidServiceFilter = filter;
    this._otherSubscription = this.paidServiceService.getHistoryByFilter({...filter as PaidServiceHistoryFilterModel, PostId: this.post.postId})
        .subscribe(ds => {
            this.paidServiceData = ds.data;
            this.paidServiceDataSize = ds.dataSize;
        })
  }
  postStatsTableChanged(filter: DataTableOutput) {
    this._otherSubscription = this.statsService.getListByFilter({...filter as PostStatsFilterModel, PostId: this.post.postId, StatType: "REP"})
        .subscribe(ds => {
            this.postStatsData = ds.data;
            this.postStatsDataSize = ds.dataSize;
        })
  }
  paidServiceDownload(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.paidServiceService.exportHistoryByFilter({...filter as PaidServiceHistoryFilterModel, PostId: this.post.postId}).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `PaidServices-${this.post.postId}-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }
  paidServiceBtnClicked(index: number) {
    if(index == 0) {
      this._otherSubscription = this.paidServiceService.getPaidServices().pipe(
        switchMap(paidServices => this.dialog.open(PostAddServiceDialogComponent, {data: paidServices}).afterClosed()),
        filter(selected => selected),
        tap(selected => {this.selectedService = selected.paidService; this.selectedHour = +(selected.hour as string)}),
        switchMap(() => this.confirm.open({Message: 'Are you sure you want to install <'+this.selectedService.nameEn+'> on this post?'})),
        filter(result => result),
        switchMap(() => this.postService.addServiceToPost(this.post.postId, this.selectedService.paidServiceId, this.selectedHour))
      ).subscribe(x => {
        if(x) {
          this.paidServiceTableChanged(this.lastPaidServiceFilter);
          this.snackBar.open('Service Added','Dismiss', {duration: 2000});
          
        }
      });
    }
  }
  postStatsDownload(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.statsService.exportHistoryByFilter({...filter as PostStatsFilterModel, PostId: this.post.postId, StatType: "REP"}).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `PostStats-${this.post.postId}-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }

  changeStatus(status: string) {
    if(status == 'Refused') {
      this.dialog.open(PostStatusReasonComponent, {data: this.post.statusReason}).afterClosed().pipe(
        filter(reason => reason),
        switchMap(reason => this.postService.changePostStatus(this.post.postId, status, reason))
      ).subscribe(post => {
        if(post) {
          this.snackBar.open('Post Status Updated','Dismiss', {duration: 2000});
          if(this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          }
          else {
            this.location.back();
          }
        }
      })
    }
    else {
      this.confirm.open({Title: 'Change Status', Message: 'Are you sure you want to change post status?'}).pipe(
        filter(result => result),
        switchMap(() => this.postService.changePostStatus(this.post.postId, status, ''))
      )
      .subscribe(post => {
        if(post) {
          this.snackBar.open('Post Status Updated','Dismiss', {duration: 2000});
          if(this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          }
          else {
            this.location.back();
          }
        }
      })
    }
  }
  paidServiceTableMenuClicked(menuClickObject:{index: number, obj: PaidServiceHistoryListViewModel, objIndex: number}){
    if(menuClickObject.index == 0) {
      this.confirm.open({Message: 'Are you sure you want to deactivate '+ menuClickObject.obj.nameEn + '?'})
      .pipe(
        filter(result => result),
        switchMap(() => this.paidServiceService.deactivateService(menuClickObject.obj.postPaidServiceId, menuClickObject.objIndex))
      ).subscribe(result => {
        if(result) {
          this.paidServiceData[menuClickObject.objIndex] = {...this.paidServiceData[menuClickObject.objIndex], isActive: false}
          this.paidServiceData = [...this.paidServiceData]
        }
      })
    }
  }
  sendNotification(userId: string, title: string, postId: number) {
    this.router.navigate(['/notification-manual'], {queryParams: {userId: [userId], title: title, postId: postId, route: 'adDetailsScreen', myPost: true}})
  }
  sendNotificationOthers(userId: string, title: string, postId: number, description: string) {
    this.router.navigate(['/notification-manual'], {queryParams: {isExclude: true, userId: [userId], title: title, postId: postId, route: 'adDetailsScreen', myPost: false, body: description}})
  }
  sendSms(mobileNumber: string) {
    this.dialog.open(SmsDialogComponent, {data: [mobileNumber]});
  }
}
