import { Component, Input, OnInit, forwardRef, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AbstractControl, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatInputModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    },
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    CurrencyPipe
  ]
})
export class InputComponent implements OnInit {
  private currencyPipe = inject(CurrencyPipe);
  @Input() type = 'text';
  @Input({ required: true }) formGroup!: AbstractControl;
  @Input({ required: true }) controlName = '';
  @Input() label = '';
  @Input() isAsync = false;
  @Input() placeHolder = '';
  @Input() matchLabel = '';
  @Input() lines = 2;
  formControl!: FormControl;
  @Input() prefixIcon!: string;
  @Input() isCurrency = false;
  ngOnInit(): void {
    if(this.isCurrency && this.formGroup.get(this.controlName)?.value) {
      this.formGroup.get(this.controlName)?.setValue(this.currencyPipe.transform(this.formGroup.get(this.controlName)?.value), 'SYP');
    }
    this.formControl = this.formGroup.get(this.controlName) as FormControl;
    
  }
  getErrors() {
    if (!this.formControl) return '';
    const controlErrors = this.formControl.errors;
    if (!controlErrors) return '';
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
      if (keyError === 'notGreater') errorMessage += `Must be greater than  ${this.matchLabel}`;
      if (keyError === 'notLess') errorMessage += `Must be less than  ${this.matchLabel}`;
      if (keyError === 'password') errorMessage += `At least 6 characters, at least one digit, one upper & one lower case!`;
    })
    return errorMessage;
  }
}
