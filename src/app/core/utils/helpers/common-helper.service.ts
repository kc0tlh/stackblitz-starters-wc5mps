import {Injectable} from '@angular/core';
import {MerchantStatus} from '../../models/ui/merchant-status';
import {NgForm, NgModel} from '@angular/forms';

@Injectable()
export class CommonHelper {

  /**
   * copy object without reference cache
   * @param obj
   */
  public deepCopy(obj: any) {
    let temp = obj;
    if (obj && typeof obj === 'object') {
      temp = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
      for (const i in obj) {
        temp[i] = this.deepCopy(obj[i]);
      }
      this.copy(temp, obj);
    }
    return temp;
  }

  public copy(temp: any, obj: any) {
    for (const i in obj) {
      temp[i] = this.deepCopy(obj[i]);
    }
  }

  /**
   * check if two arrays contains the same objects
   * @param ary1
   * @param ary2
   * @private
   */
  public isArrayEqual(ary1: any[], ary2: any[]) {
    const result = ary1.filter(o1 => ary2.some(o2 => JSON.stringify(o1) === JSON.stringify(o2)));
    return result.length === 0;
  }

  /**
   * add suffixes to numbers
   * @param value
   */
  public suffixNumber(value: number) {
    const j = value % 10,
      k = value % 100;
    if (j == 1 && k != 11) {
      return value + 'st';
    }
    if (j == 2 && k != 12) {
      return value + 'nd';
    }
    if (j == 3 && k != 13) {
      return value + 'rd';
    }
    return value + 'th';
  }

  public getMerchantStatus(status: MerchantStatus): string {
    switch (status) {
      case MerchantStatus.AVAILABLE:
        return 'Available';
      case MerchantStatus.UNAVAILABLE:
        return 'Unavailable';
      case MerchantStatus.SOLD_OUT:
        return 'Sold out for today';
      default:
        return 'Not defined';
    }
  }

  public registerControls(form: NgForm, controls: (NgModel | undefined)[]) {
    for (const control of controls) {
      if (control !== undefined) {
        form.addControl(control);
      }
    }
  }
}
