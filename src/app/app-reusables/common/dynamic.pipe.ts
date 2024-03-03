import { DatePipe } from '@angular/common';
import { Injector, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamic',
  standalone: true
})
export class DynamicPipe implements PipeTransform {

  constructor(private injector: Injector){}
  transform(value: unknown, token: any, ...args: unknown[]): unknown {
    if(!token) {
      return value;
    }
    if(token === 'TimePipe') {
      const pipe = this.injector.get<PipeTransform>(DatePipe);
      return pipe.transform(value, 'HH:mm');
    }
    if(token === 'LongString') {
      return value && (value as string).length > 25 ? (value as string).substring(0,25) + '...' : value;
    }
    const pipe = this.injector.get<PipeTransform>(token);
    return pipe.transform(value, ...args);
  }

}
