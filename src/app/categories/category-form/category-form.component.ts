import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Category } from '../../app-models/generic';
import { CategoryService } from '../category.service';
import { FormGroup } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InputComponent } from "../../app-reusables/controls/input/input.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable } from 'rxjs';
import { SelectComponent } from "../../app-reusables/controls/select/select.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-category-form',
    standalone: true,
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss'],
    imports: [CommonModule, MatToolbarModule, InputComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule, SelectComponent, MatIconModule, MatButtonModule, MatDialogModule]
})
export class CategoryFormComponent{
  private categoryService = inject(CategoryService);
  frm: FormGroup;
  iconSource!: string | ArrayBuffer | null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {category?: Category, categoryList$: Observable<Category[]>, isParent?: boolean}) {
    this.frm = this.categoryService.createCategoryForm(data.category, data.isParent);
    this.iconSource = this.frm.get('IconUrl')?.value;
  }
  reset() {
    this.frm.setValue(this.categoryService.createCategoryForm(this.data.category, this.data.isParent).value);    
    this.iconSource = this.frm.get('IconUrl')?.value;
  }
  previewIcon(event: any) {
    if(!event.target?.files || event.target?.files.length === 0) {
      return;
    }
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.iconSource = reader.result;      
    };
    reader.readAsDataURL(selectedFile);
    this.frm.get('IconFile')?.setValue(selectedFile);
  }

  deleteIcon() {
    this.frm.get('IconFile')?.setValue(null);
    this.iconSource = "";
  }

}
