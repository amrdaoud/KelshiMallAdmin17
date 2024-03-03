import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { Post, PostFilterModel, PostListViewModel } from './post';
import { environment } from '../../environments/environment';
import { DataWithSize } from '../app-reusables/data-table/data-table.models';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Field } from '../app-models/generic';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private postsUrl = environment.apiUrl + 'posts'
  private loadingGetPostsByFilter = new BehaviorSubject<boolean>(false);
  get loadingGetPostsByFiter$(): Observable<boolean> {
    return this.loadingGetPostsByFilter.asObservable();
  }
  private loadingPost =  new BehaviorSubject<boolean>(false);
  get loadingPost$(): Observable<boolean> {
    return this.loadingPost.asObservable();
  }
  private loadingTitle =  new BehaviorSubject<boolean>(false);
  get loadingTitle$(): Observable<boolean> {
    return this.loadingTitle.asObservable();
  }
  private loadingDescription =  new BehaviorSubject<boolean>(false);
  get loadingDescription$(): Observable<boolean> {
    return this.loadingDescription.asObservable();
  }
  private loadingStatus =  new BehaviorSubject<boolean>(false);
  get loadingStatus$(): Observable<boolean> {
    return this.loadingStatus.asObservable();
  }
  private loadingAddService =  new BehaviorSubject<boolean>(false);
  get loadingAddService$(): Observable<boolean> {
    return this.loadingAddService.asObservable();
  }

  private downloadingGetPostsByFilter = new BehaviorSubject<boolean>(false);
  get downloadingGetPostsByFiter$(): Observable<boolean> {
    return this.downloadingGetPostsByFilter.asObservable();
  }
  constructor() { }

  createPostForm(fields: Field[], post?: Post): FormGroup {
    const frm = new FormGroup({
      PostId: new FormControl(post?.postId ?? 0, Validators.required),
      Title: new FormControl(post?.title, {validators: Validators.required}),
      Description: new FormControl(post?.description),
      ThumbnailUrl: new FormControl(post?.thumbnailUrl ?? ""),
      PostingDate: new FormControl(post?.postingDate, Validators.required),
      Price: new FormControl(post?.price, [Validators.required, Validators.min(0)]),
      IsNegotiable: new FormControl(post?.isNegotiable, Validators.required),
      IsFeatured: new FormControl(post?.isFeatured, Validators.required),
      StoreId: new FormControl(post?.storeId, Validators.required),
      CategoryId: new FormControl(post?.categoryId, Validators.required),
      Status: new FormControl(post?.status, Validators.required),
      Area: new FormControl(post?.area, Validators.required),
      City: new FormControl(post?.city, Validators.required),
      PostData: this.createPostDataFormArray(fields, post),
      StatusReason: new FormControl(post?.statusReason)
    });
    frm.disable();
    frm.get('PostId')?.enable();
    frm.get('Title')?.enable();
    frm.get('Description')?.enable();
    frm.get('Price')?.enable();
    // frm.get('Status')?.enable();
    // frm.get('StatusReason')?.enable();
    return frm;
  }
  createPostDataFormArray(fields: Field[], post?: Post): FormArray {
    const frmArray = new FormArray(
      fields.map(f => new FormGroup({
        postDataId: new FormControl(post?.postData.find(x => x.parameterType == f.fieldId.toString())?.postDataId ?? 0, Validators.required),
        parameterType: new FormControl(f.fieldId.toString()),
        parameterValue: new FormControl(
          f.type == 'CheckBox' ? f.contentTextAr : post?.postData.find(x => x.parameterType == f.fieldId.toString())?.parameterValue ?? '' ,
          f.isMandatory ? Validators.required : null),
        parameterCheckValue: new FormControl(post?.postData.find(x => x.parameterType == f.fieldId.toString())?.parameterValue ? true : false, f.isMandatory ? Validators.required : null),
        postId: new FormControl(0)
      },))
    )
    frmArray.disable();
    return frmArray;
  }

  getPostsByFilter(filter: PostFilterModel): Observable<DataWithSize> {
    this.loadingGetPostsByFilter.next(true);
    return this.http.post<DataWithSize>(this.postsUrl + '/filter', filter).pipe(
      finalize(() => this.loadingGetPostsByFilter.next(false))
    )
  }
  exportPostsByFilter(filter: PostFilterModel): Observable<any> {
    this.downloadingGetPostsByFilter.next(true);
    return this.http.post(this.postsUrl + '/filter/export', filter, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob'}).pipe(
      finalize(() => this.downloadingGetPostsByFilter.next(false))
    )
  }
  getPostById(postId: number): Observable<Post> {
    this.loadingPost.next(true);
    return this.http.get<Post>(this.postsUrl + `?postId=${postId}`).pipe(
      finalize(() => this.loadingPost.next(false))
    )
  }
  editPost(postId: number, post: Post): Observable<Post> {
    this.loadingPost.next(true);
    return this.http.post<Post>(this.postsUrl + `?postId=${postId}`, post).pipe(
      finalize(() => this.loadingPost.next(false))
    )
  }
  changePostStatus(PostId: number, Status: string, StatusReason: string): Observable<Post> {
    this.loadingStatus.next(true);
    return this.http.post<Post>(this.postsUrl + `/changestatus`, {PostId, Status, StatusReason}).pipe(
      finalize(() => this.loadingStatus.next(false))
    )
  }
  changePostTitle(postId: number, newTitle: string): Observable<{title: string}> {
    this.loadingTitle.next(true);
    return this.http.get<{title: string}>(this.postsUrl + `/changeTitle?postId=${postId}&newTitle=${newTitle}`).pipe(
      finalize(() => this.loadingTitle.next(false))
    )
  }
  changePostPrice(postId: number, newPrice: number): Observable<{price: number}> {
    this.loadingTitle.next(true);
    return this.http.get<{price: number}>(this.postsUrl + `/changePrice?postId=${postId}&newPrice=${newPrice}`).pipe(
      finalize(() => this.loadingTitle.next(false))
    )
  }
  changePostDescription(postId: number, newDescription: string): Observable<{description: string}> {
    this.loadingDescription.next(true);
    return this.http.get<{description: string}>(this.postsUrl + `/changeDescription?postId=${postId}&newDescription=${newDescription}`).pipe(
      finalize(() => this.loadingDescription.next(false))
    )
  }
  addServiceToPost(postId: number, serviceId: number, hour: number):Observable<boolean> {
    this.loadingAddService.next(true);
    return this.http.get<boolean>(`${this.postsUrl}/addService?postId=${postId}&serviceId=${serviceId}&hour=${hour}`).pipe(
      finalize(() => this.loadingAddService.next(false))
    )
  }
}
