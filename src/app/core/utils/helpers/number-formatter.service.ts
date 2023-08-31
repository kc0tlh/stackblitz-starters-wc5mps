import { Injectable } from '@angular/core';

@Injectable()
export class NumberFormatter {

  public formatNumber(value: any, min: number, max: number) {
    return new Intl.NumberFormat('en-us', {minimumFractionDigits: min, maximumFractionDigits: max}).format(value);
  }

  /**
   * Formats a number with a minimum and maximum number of decimal places
   * @public
   * @param number: The number to be formatted
   * @param fixed: The number of decimal places to include
   * @returns A string representation of the formatted number
   */
  public formatNumberWithCommas(number: number, fixed: number) {
    return (number % 1 == 0 ? number.toString() : number.toFixed(fixed)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}
