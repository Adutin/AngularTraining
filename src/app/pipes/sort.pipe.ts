import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, field: string): any {
    if (!field) return value;
    if (!value.length || value.length <=1) return value;

    if (Number(value[0][field]) != NaN) return value.sort((a, b) => a[field] < b[field] ? -1 : 1);
    if (value[0][field] instanceof Date) return value.sort((a, b) => a[field] < b[field] ? -1 : 1);

    return value.sort((a, b) => a[field].localeCompare(b[field]));
  }

}
