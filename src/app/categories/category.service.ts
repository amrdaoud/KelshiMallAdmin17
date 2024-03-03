import { Injectable, inject } from '@angular/core';
import { Category } from '../app-models/generic';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { convertJsontoFormData } from '../app-reusables/helpers';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
  private url = environment.apiUrl + 'categories';
  private http = inject(HttpClient);
  createCategoryForm(category?: Category, isParent?: boolean): FormGroup {
    const frm = new FormGroup({
      CategoryId: new FormControl(category?.categoryId ?? 0),
      NameEn: new FormControl(category?.nameEn ?? '', Validators.required),
      NameAr: new FormControl(category?.nameAr ?? '', Validators.required),
      IconUrl: new FormControl(category?.iconUrl ?? ''),
      IconFile: new FormControl(null),
      ParentCategoryId: new FormControl(category?.parentCategoryId ?? null),
      BackGroundColor: new FormControl(category?.backGroundColor ?? '#000000'),
      HighlightColor: new FormControl(category?.highlightColor ?? '#000000'),
      Sorting: new FormControl(category?.sorting ?? null)
    });
    return frm;
  }
  addUpdateCategory(model: Category): Observable<Category> {
    const frmData = convertJsontoFormData(model);
    return this.http.post<Category>(this.url, frmData);
  }
}
