import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatIconModule,MatProgressSpinnerModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() type = 'text';
  @Input() formGroup!: AbstractControl;
  @Input() controlName = '';
  @Input() label = '';
  @Input() isAsync = false;
  @Input() placeHolder = '';
  @Input() isLoading = false;
  @Input() options:Array<any> = [];
  @Input() optionValue = 'Id';
  @Input() optionDisplay = 'Name';
  @Input() optionDisplay2 = '';
  @Input() isMulty = false;
  @Input() haveNull = false;
  @Input() defaultValue: number | string | undefined;
  @Output() valueChanges = new EventEmitter<any>();
  formControl!: FormControl;
  constructor() { }

  ngOnInit(): void {
    this.formControl = this.formGroup.get(this.controlName) as FormControl;
  }
  getErrors(): string {
    if(!this.formControl) return '';
    const controlErrors = this.formControl.errors;
    if(!controlErrors) return '';
    let errorMessage = '';
    Object.keys(controlErrors).forEach(keyError => {
      if (keyError === 'isTaken') errorMessage += `${this.formControl.value} is taken!`;
      if (keyError === 'minlength') errorMessage += `Minimum length is: ${controlErrors[keyError].requiredLength}`;
      if (keyError === 'maxlength') errorMessage += `Maximum length is: ${controlErrors[keyError].requiredLength}`;
      if (keyError === 'required') errorMessage += `${this.label} is required!`;
      if (keyError === 'email') errorMessage += `Not matching Email address pattern!`;
      if (keyError === 'pattern') errorMessage += `Not matching pattern!`;
      if (keyError === 'notMatched') errorMessage += `Not matched with Password!`;
      if (keyError === 'connection') errorMessage += `Connection Problem!`;
      if (keyError === 'password') errorMessage += `At least 6 characters, at least one digit, one upper & one lower case!`;
    })
    return errorMessage;
  }
  onValueChange(val: any) {
    this.valueChanges.emit(val);
  }


}
