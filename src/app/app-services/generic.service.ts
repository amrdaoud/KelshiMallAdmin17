import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Area, Category, Field } from '../app-models/generic';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { convertJsontoFormData } from '../app-reusables/helpers';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private http = inject(HttpClient);
  private genericApi = environment.apiUrl + 'generics/'
  private loadingCategories = new BehaviorSubject<boolean>(false);
  private cities = new BehaviorSubject<Area[]>([]);
  get cities$(): Observable<Area[]> {
    return this.cities.asObservable();
  }
  private categories = new BehaviorSubject<Category[]>([]);
  get categories$(): Observable<Category[]> {
    return this.categories.asObservable();
  }
  get loadingCategories$():Observable<boolean> {
    return this.loadingCategories.asObservable();
  }
  private loadingFields = new BehaviorSubject<boolean>(false);
  get loadingFields$():Observable<boolean> {
    return this.loadingFields.asObservable();
  }
  private loadingAreas = new BehaviorSubject<boolean>(false);
  get loadingAreas$():Observable<boolean> {
    return this.loadingAreas.asObservable();
  }

  private loadingUpload = new BehaviorSubject<boolean>(false);
  get loadingUpload$():Observable<boolean> {
    return this.loadingUpload.asObservable();
  }
  constructor() {
    this.getAreas().subscribe();
    this.getCategories().subscribe();
  }
  getCategories(): Observable<Category[]> {
    this.loadingCategories.next(true);
    return this.http.get<Category[]>(this.genericApi + 'categories').pipe(
      tap(a => this.categories.next(a)),
      finalize(() => this.loadingCategories.next(false))
    )
  }
  getFieldsByCategory(categoriId: number): Observable<Field[]> {
    this.loadingFields.next(true);
    return this.http.get<Field[]>(this.genericApi + 'fieldsbycategory?categoryId='+categoriId).pipe(
      finalize(() => this.loadingFields.next(false))
    )
  }
  getAreas(): Observable<Area[]> {
    this.loadingAreas.next(true);
    return this.http.get<Area[]>(this.genericApi + 'areas').pipe(
      tap(a => this.cities.next(a)),
      finalize(() => this.loadingAreas.next(false))
    )
  }
  uploadFile(model: any): Observable<boolean> {
    this.loadingUpload.next(true);
    const frmData = convertJsontoFormData(model);
    return this.http.post<boolean>(environment.apiUrl + 'uploadApp', frmData).pipe(
      finalize(() => this.loadingUpload.next(false))
    )
  }
  resetCategories() {
    this.getCategories().subscribe();
  }
}
