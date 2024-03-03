import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { LocaleDatePipe } from '../../app-reusables/common/locale-date.pipe';
import { Unsubscriber } from '../../app-reusables/common/unsubscriber';
import { PostService } from '../post.service';
import { DeviceService } from '../../app-reusables/services/device.service';
import { map } from 'rxjs';
import { postFilters, postListColumns, postMenuBtns } from '../post.const';
import { Post, PostFilterModel } from '../post';
import { DataTableOutput } from '../../app-reusables/data-table/data-table.models';
import { Router } from '@angular/router';
import { AccountService } from '../../app-reusables/account/services/account.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent, MatGridListModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  providers: [CurrencyPipe, LocaleDatePipe]
})
export class PostListComponent extends Unsubscriber implements AfterViewInit {
  private postService = inject(PostService);
  private router = inject(Router);
  private deviceService = inject(DeviceService);
  private accountService = inject(AccountService);
  private canSendNotification = this.accountService.inRoles(['Super User', 'Notification Manager'])
  filters = postFilters;
  menuBtns = this.canSendNotification ? postMenuBtns : [];
  lastFilter!: DataTableOutput;
  isLoading$ = this.postService.loadingGetPostsByFiter$;
  columnDefs = this.deviceService.isHandset$.pipe(
    map((ishandset: boolean) => {
        if(ishandset) {
            return postListColumns.filter(x => !x.HideHandset)
        }
        return postListColumns
    })
  );
  data: any[] = [];
  dataSize!: number;
  
  ngAfterViewInit():void {
      this._otherInterval = setInterval(()=> { 
        this.tableChange(this.lastFilter)
       }, 5 * 60000);
  }
  tableChange(filter: DataTableOutput) {
    this.lastFilter = filter;
    this._otherSubscription = this.postService.getPostsByFilter(filter as PostFilterModel)
        .subscribe(ds => {
            this.data = ds.data;
            this.dataSize = ds.dataSize;
        })
  }
  download(filter: DataTableOutput) {
    const dd = Date.now();
    this._otherSubscription = this.postService.exportPostsByFilter(filter as PostFilterModel).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', `Posts-${dd}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }
  goToPost(post: Post) {
    this.router.navigateByUrl(`/posts/${post.postId}`);
  }
  goToPostNew(post: Post) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/posts/${post.postId}`])
    );
  
    window.open(url, '_blank');
  }
  menuBtnClicked(object: {index: number, obj: Post, objIndex: number}) {
    if(object.index == 0) {
      this.router.navigate(['/notification-manual'], {queryParams: {userId: [object.obj.userId], title: object.obj.title, postId: object.obj.postId, route: 'adDetailsScreen', myPost: true}})
    }
    else if(object.index == 1) {
      this.router.navigate(['/notification-manual'], {queryParams: {isExclude: true, userId: [object.obj.userId], title: object.obj.title, postId: object.obj.postId, route: 'adDetailsScreen', myPost: false, body: object.obj.description}})
    }
  }
  
}
