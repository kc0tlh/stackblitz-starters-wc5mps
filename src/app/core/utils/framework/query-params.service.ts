import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class QueryParamsService {
  constructor() {}

  /**
   * Convert given criteria object as query param string
   * @param criteria
   */
  public asString(criteria: any): string {
    let params = '';
    const keys = Object.keys(criteria);

    for (let i = 0; i < keys.length; i++) {
      if (i === 0) {
        params += '?';
      } else {
        params += '&';
      }
      if (criteria.hasOwnProperty(keys[i])) {
        params += keys[i] + '=' + criteria[keys[i]];
      }
    }
    return params;
  }

  /**
   * Convert given criteria object as HttpParams
   * @param criteria
   */
  public getHttpParams(criteria: any): HttpParams {
    const httpParamsOptions = {};
    const keys = this.getNotNullQueryParamsArray(criteria);
    if (keys) {
      for (let i = 0; i < keys.length; i++) {
        if (criteria.hasOwnProperty(keys[i])) {
          httpParamsOptions[keys[i]] = criteria[keys[i]];
        }
      }
    }
    return new HttpParams({fromObject:httpParamsOptions});
  }

  /**
   * Returns valid param attributes to be persist in chip input
   * @param object
   */
  private getNotNullQueryParamsArray(object: any): any {
    if (object && Object.keys(object).length > 0) {
      return Object.keys(object).filter((key: any) => {
        const value = object[key];
        if (value != null && value.toString().length > 0) {
          return key;
        }
      });
    }
  }
}
