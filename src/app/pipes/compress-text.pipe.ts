import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compressText'
})
export class CompressTextPipe implements PipeTransform {

  transform(value: string): string {
    return value.length > 75 ? (value.slice(0, 75) + '...') : value;
  }
}
