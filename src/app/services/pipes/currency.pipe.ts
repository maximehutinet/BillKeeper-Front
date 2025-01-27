import { Pipe, PipeTransform } from '@angular/core';
import {Currency} from '../billkeeper-ws/bill/model';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(currency: String): string {
    switch (currency) {
      case Currency.CHF:
        return "CHF";
      case Currency.EURO:
        return "€";
      default:
        return ""
    }
  }

}
