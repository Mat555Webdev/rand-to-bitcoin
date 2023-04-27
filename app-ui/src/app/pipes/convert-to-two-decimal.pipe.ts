import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToTwoDecimal',
  standalone: true
})
export class ConvertToTwoDecimalPipe implements PipeTransform {
  transform(value: number | string): string {
    //form returns a string instead of a number despite the <number> type on the form control
    const result = parseInt(value as string).toFixed(2); 

    return result;
  }
}
