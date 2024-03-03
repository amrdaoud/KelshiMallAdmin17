import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../app-reusables/controls/input/input.component';
import { SelectComponent } from '../../app-reusables/controls/select/select.component';
import { DeviceService } from '../../app-reusables/services/device.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { filter, switchMap } from 'rxjs';
import { NotificationService } from '../notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getLocaleDate } from '../../app-reusables/common/date-helper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification-manual',
  standalone: true,
  imports: [CommonModule, MatGridListModule, InputComponent, SelectComponent, ReactiveFormsModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './notification-manual.component.html',
  styleUrls: ['./notification-manual.component.scss']
})
export class NotificationManualComponent extends Unsubscriber implements OnInit {
  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    this.routeIsAll = queryParams.get('isAll') === 'true';
    this.routeIsExclude = queryParams.get('isExclude') === 'true';
    this.routeTitle = queryParams.get('title') || '';
    this.routeBody = queryParams.get('body') || '';
    this.routePostId = queryParams.get('postId');
    this.routeStoreId = queryParams.get('storeId');
    this.routeRoute = queryParams.get('route') ? '/' + queryParams.get('route') : '/';
    this.routeMyPost = queryParams.get('myPost') === 'true';
    this.routeUserId = queryParams.getAll('userId') ?  queryParams.getAll('userId').join('\n') : '';

    this.frm.get('UserIds')?.setValue(this.routeUserId);
    this.frm.get('Title')?.setValue(this.routeTitle);
    this.frm.get('Body')?.setValue(this.routeBody);
    this.frm.get('Data')?.get('postId')?.setValue(this.routePostId);
    this.frm.get('Data')?.get('storeId')?.setValue(this.routeStoreId);
    this.frm.get('Data')?.get('route')?.setValue(this.routeRoute);
    this.frm.get('Data')?.get('isMyPost')?.setValue(this.routeMyPost);

    if(this.routeIsAll) {
        this.frm.get('UserIds')?.setValue(['Sending to all users']);
        this.frm.get('UserIds')?.disable();
    }
    else if(this.routeIsExclude) {
      this.frm.get('UserIds')?.setValue(this.routeUserId);
    }
  }
  private notificationService = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private deviceService = inject(DeviceService);
  private confirm = inject(ConfirmService);
  private snackBar = inject(MatSnackBar);
  routeIsAll = false;
  routeIsExclude = false;
  private routeTitle: string | null = '';
  private routePostId: string | null = null;
  private routeStoreId: string | null = null;
  private routeBody: string | null = '';
  private routeRoute: string = '/';
  private routeMyPost = false;
  private routeUserId: string = '';
  // routeExUserId: string[] = [];
  isHandset$ = this.deviceService.isHandset$;
  loadingSendNotifications$ = this.notificationService.loadingSendNotifications$;
  routeOptions = [
    {Name: 'Home', Value: '/'},
    {Name: 'Ad Details', Value: '/adDetailsScreen'},
    {Name: 'Ad List', Value: '/viewAllAdsScreen'},
    {Name: 'Store', Value: '/storeScreen'},
    {Name: 'Membership', Value: '/membershipScreen'},
    {Name: 'Features', Value: '/viewAllFeaturedAdsScreen'},
    {Name: 'Wallet', Value: '/wallet'},
    {Name: 'Paid Services', Value: '/paidServices'}
  ]
  frm = new FormGroup<any>({
    UserIds: new FormControl('', Validators.required),
    Title: new FormControl('', Validators.required),
    Body: new FormControl('', Validators.required),
    Save: new FormControl(true, Validators.required),
    Data: new FormGroup({
      route: new FormControl('/', Validators.required),
      postId: new FormControl(),
      storeId: new FormControl(),
      isMyPost: new FormControl(false),
      date: new FormControl('')
    })
  })
  get dataForm(): FormGroup {
    return this.frm.get('Data') as FormGroup;
  }
  resetContents() {
    this.frm.reset({
      UserIds: this.frm.get('UserIds')?.value,
      Save: true
    });
  }
  resetAll() {
    this.frm.reset({
      Save: true
    });
    this.frm.get('UserIds')?.setValue(this.routeUserId);
    this.frm.get('Title')?.setValue(this.routeTitle);
    this.frm.get('Body')?.setValue(this.routeBody);
    this.frm.get('Data')?.get('postId')?.setValue(this.routePostId);
    this.frm.get('Data')?.get('storeId')?.setValue(this.routeStoreId);
    this.frm.get('Data')?.get('route')?.setValue(this.routeRoute);
    this.frm.get('Data')?.get('isMyPost')?.setValue(this.routeMyPost);

    if(this.routeIsAll) {
        this.frm.get('UserIds')?.setValue('Sending to all users');
        this.frm.get('UserIds')?.disable();
    }
    else if(this.routeIsExclude) {
      this.frm.get('UserIds')?.setValue(this.routeUserId);
    }
  }
  submit() {
    if(this.frm.invalid) {
      return;
    }
    const model: any = Object.assign({}, this.frm.value);
    if(!this.routeIsAll){
      model.UserIds = (model.UserIds as string).split(/\r?\n/);
    } else {
      model.UserIds = [];
    }
    model.Data.isMyPost = model.Data.isMyPost ? 'true' : 'false';
    model.Data.date = getLocaleDate(new Date());

    this._otherSubscription = this.confirm.open({Message: 'Are you sure you want to send this notification?'}).pipe(
      filter(result => result),
      switchMap(() => {
        if(this.routeIsExclude) {
          return this.notificationService.sendMulticastNotificationsExclude(model);
        }
        else if(this.routeIsAll) {
          return this.notificationService.sendMulticastNotificationsAll(model);
        }
        return this.notificationService.sendMulticastNotifications(model);
      })
    ).subscribe(x => {
      if(x) {
        if(x > 0) {
          this.snackBar.open('Notification successfully sent to <'+x+'> users','Dismiss', {duration: 10000})
        }
        else {
          this.snackBar.open('Notification not sent','Dismiss', {duration: 10000})
        }
      }
    })
  }
}
