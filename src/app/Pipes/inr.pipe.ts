import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iNR'
})
export class INRPipe implements PipeTransform {

  transform(value: string): string {
    return `₹ ${value}`;
  }

}
