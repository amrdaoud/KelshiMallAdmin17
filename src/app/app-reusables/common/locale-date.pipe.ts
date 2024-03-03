import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeDate',
  standalone: true
})
export class LocaleDatePipe implements PipeTransform {

  constructor(
    //private translateService: TranslateService
    ){}
  transform(value: Date, format = 'mediumDate'): unknown {
    if(!value) {
      return '';
    }
    if(!value.toString().includes('Z')) {
      const date = new Date(value.toString().replace('Z',''));
      const datePipe = new DatePipe('en');
      return datePipe.transform(date, format);
    }
    const date = new Date(value.toString().replace('Z',''));
    const gDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
    const datePipe = new DatePipe('en');
    return datePipe.transform(gDate, format);
  }

}
