import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { DeviceService } from '../../app-reusables/services/device.service';
import { GenericService } from '../../app-services/generic.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Category, Field, FieldContent } from '../../app-models/generic';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { DataTableComponent } from '../../app-reusables/data-table/data-table.component';
import { contentColumns, fieldsColumns } from '../category.const';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { filter, switchMap } from 'rxjs';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatFormFieldModule, MatSelectModule, MatCardModule, FormsModule, MatListModule, DataTableComponent, MatIconModule, MatButtonModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  private deviceService = inject(DeviceService);
  private genericService = inject(GenericService);
  private categoryService = inject(CategoryService);
  private dialog = inject(MatDialog);
  selectedCategory!: Category | null;
  selectedSubCategory: Category | undefined;
  selectedSubCategoryName = '';
  selectedFieldName = '';
  isHandset$ = this.deviceService.isHandset$;
  categories$ = this.genericService.categories$;
  fields: Field[] = [];
  fieldsCols = fieldsColumns;
  contents: FieldContent[] = [];
  contentCols = contentColumns;
  getFields(subCategory: Category) {
    this.selectedSubCategory = subCategory;
    this.selectedSubCategoryName = subCategory.nameAr;
    this.selectedFieldName = '';
    this.genericService.getFieldsByCategory(subCategory.categoryId).subscribe(x => this.fields = x);
    this.resetContents();
  }
  showFieldContents(field: Field) {
    this.selectedFieldName = field.contentTextAr;
    this.contents = field.fieldContent;
  }
  resetFields() {
    this.selectedSubCategoryName = '';
    this.selectedSubCategory = undefined;
    this.selectedFieldName = '';
    this.fields = [];
  }
  resetContents() {
    this.contents = [];
  }
  openCategoryForm(category?: Category) {
    this.dialog.open(CategoryFormComponent, {data: {category: category, categoryList$: this.categories$, isParent: true}, panelClass: 'form-dialog'})
    .afterClosed()
    .pipe(
      filter(category => category),
      switchMap(category => this.categoryService.addUpdateCategory(category)),
      switchMap(category => this.genericService.getCategories())
    ).subscribe(
      x => this.selectedCategory = null
    );
  }
  openSubCategoryForm(category?: Category) {
    this.dialog.open(CategoryFormComponent, {data: {category: category, categoryList$: this.categories$}, panelClass: 'form-dialog'})
    .afterClosed()
    .pipe(
      filter(category => category),
      switchMap(category => this.categoryService.addUpdateCategory(category))
    ).subscribe();
  }
  openFieldForm() {

  }
  openContentForm() {

  }
}
