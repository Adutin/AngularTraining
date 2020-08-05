import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural'
})
export class PluralPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!args || !args.length || args.length < 2) return value;
    if (value == 1) return value + ' ' + args[0];
    return value + ' ' + args[1];
  }
}
