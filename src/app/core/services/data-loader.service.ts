import { Injectable } from '@angular/core';
import { DataKey, DataStore } from '../utils/framework/data-store.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigLoader } from '../utils/framework/config-loader.service';
import { CONST } from '../utils/constant';
import { BehaviorSubject } from 'rxjs';
import { RequestOptions } from '../models/request-options';
import { KeyValue } from '../models/ui/key-value';
import { HeaderService } from './header-service';
import { BaseService } from './base-service';
import { CookieService } from 'ngx-cookie-service';
import { CleverTapService } from '../utils/helpers/clever-tap.service';

@Injectable()
export class DataLoaderService {

  public endpointId: string;

  constructor(
    private configLoader: ConfigLoader,
    private dataStore: DataStore,
    private headerService: HeaderService,
    private baseService: BaseService,
    private cookieService: CookieService,
    private cleverTapService: CleverTapService
  ) {
  }

  /**
   * Perform Http GET and load the response data from backend and stores it into the given behaviour subject
   * @param dataKey
   * @param endpointId
   * @param params
   * @param pathVariables
   * @param externalLink
   * @param cleverTapEvent - any events modals
   */
  public getAndLoadResponse<T>(dataKey: DataKey, endpointId: string, params?: HttpParams, pathVariables?: any[], externalLink?: string, cleverTapEvent?:any) {
    if (this.hasUrl(endpointId)) {
      const url = this.getUrl(endpointId, pathVariables, externalLink);
      const requestOptionsArgs: RequestOptions = this.getRequestOptions(params);
      this.prepareDataStore(dataKey);

      // reset headers
      this.headerService.setHeaders([]);
      this.baseService.get<T>(url, requestOptionsArgs).subscribe(results => {
        const resultsWrapper = results.body;
        if (resultsWrapper) {
          this.dataStore.set(dataKey, resultsWrapper);
        }
        // clever-tap event fire
        if (cleverTapEvent) {
          this.cleverTapService.onFireApiEvents( cleverTapEvent );
        }
      }, error => {
        // TODO - need error handling
        this.dataStore.set(dataKey, error);
      });
    } else {
      this.dataStore.set(dataKey, null);
    }
  }

  /**
   * Perform Http POST and load the response data from backend and stores it into the given behaviour subject
   * @param dataKey
   * @param endpointId
   * @param rqBody
   * @param params
   * @param pathVariables
   * @param cleverTapEvent
   */
  public postAndLoadResponse<T>(dataKey: DataKey, endpointId: string, rqBody: any, params?: HttpParams, pathVariables?: any[], cleverTapEvent?:any) {
    if (this.hasUrl(endpointId)) {
      const url = this.getUrl(endpointId, pathVariables);
      const requestOptionsArgs: RequestOptions = this.getRequestOptions(params);
      this.prepareDataStore(dataKey);

      // reset headers
      this.headerService.setHeaders([]);
      this.baseService.post<T>(url, rqBody, requestOptionsArgs).subscribe(results => {
        const resultsWrapper = results.body;
        if (resultsWrapper) {
          this.dataStore.set(dataKey, resultsWrapper);
        }
        // clever-tap event fire
        if (cleverTapEvent) {
          this.cleverTapService.onFireApiEvents( cleverTapEvent );
        }
      }, error => {
        // TODO - need error handling
        this.dataStore.set(dataKey, error);
      });
    } else {
      this.dataStore.set(dataKey, null);
    }
  }

  /**
   * Perform Http PUT and load the response data from backend and stores it into the given behaviour subject
   * @param dataKey
   * @param endpointId
   * @param rqBody
   * @param params
   * @param pathVariables
   * @param cleverTapEvent
   */
  public putAndLoadResponse<T>(dataKey: DataKey, endpointId: string, rqBody: any, params?: HttpParams, pathVariables?: any[], cleverTapEvent?:any) {
    if (this.hasUrl(endpointId)) {
      const url = this.getUrl(endpointId, pathVariables);
      const requestOptionsArgs: RequestOptions = this.getRequestOptions(params);
      this.prepareDataStore(dataKey);
      // reset headers
      this.headerService.setHeaders([]);

      this.baseService.put<T>(url, rqBody, requestOptionsArgs).subscribe(results => {
        const resultsWrapper = results.body;
        if (resultsWrapper) {
          this.dataStore.set(dataKey, resultsWrapper);
        }
        // clever-tap event fire
        if (cleverTapEvent) {
          this.cleverTapService.onFireApiEvents( cleverTapEvent );
        }
      }, error => {
        // TODO - need error handling
        this.dataStore.set(dataKey, error);
      });
    } else {
      this.dataStore.set(dataKey, null);
    }
  }

  /**
   * Perform Http PATCH and load the response data from backend and stores it into the given behaviour subject
   * @param dataKey
   * @param endpointId
   * @param rqBody
   * @param params
   * @param pathVariables
   * @param cleverTapEvent
   */
  public patchAndLoadResponse<T>(dataKey: DataKey, endpointId: string, rqBody: any, params?: HttpParams, pathVariables?: any[], cleverTapEvent?:any) {
    if (this.hasUrl(endpointId)) {
      const url = this.getUrl(endpointId, pathVariables);
      const requestOptionsArgs: RequestOptions = this.getRequestOptions(params);
      this.prepareDataStore(dataKey);
      // reset headers
      this.headerService.setHeaders([]);

      this.baseService.patch<T>(url, rqBody, requestOptionsArgs).subscribe(results => {
        const resultsWrapper = results.body;
        if (resultsWrapper) {
          this.dataStore.set(dataKey, resultsWrapper);
        }
        // clever-tap event fire
        if (cleverTapEvent) {
          this.cleverTapService.onFireApiEvents( cleverTapEvent );
        }
      }, error => {
        // TODO - need error handling
        this.dataStore.set(dataKey, error);
      });
    } else {
      this.dataStore.set(dataKey, null);
    }
  }

  /**
   * Perform Http DELETE and load the response data from backend and stores it into the given behaviour subject
   * @param dataKey
   * @param endpointId
   * @param params
   * @param pathVariables
   * @param cleverTapEvent
   */
  public deleteAndLoadResponse<T>(dataKey: DataKey, endpointId: string, params?: HttpParams, pathVariables?: any[], cleverTapEvent?:any) {
    if (this.hasUrl(endpointId)) {
      const url = this.getUrl(endpointId, pathVariables);
      const requestOptionsArgs: RequestOptions = this.getRequestOptions(params);
      this.prepareDataStore(dataKey);
      // reset headers
      this.headerService.setHeaders([]);

      this.baseService.delete<T>(url, requestOptionsArgs).subscribe(results => {
        const resultsWrapper = results.body;
        if (resultsWrapper) {
          this.dataStore.set(dataKey, resultsWrapper);
        }
        // clever-tap event fire
        if (cleverTapEvent) {
          this.cleverTapService.onFireApiEvents( cleverTapEvent );
        }
      }, error => {
        // TODO - need error handling
        this.dataStore.set(dataKey, error);
      });
    } else {
      this.dataStore.set(dataKey, null);
    }
  }


  /**
   * Return if relevant url present for given endpoint id
   * @param endpointId
   */
  public hasUrl(endpointId: string): boolean {
    this.configLoader.endpointId = endpointId;
    const url = this.configLoader.configurations.get(CONST.APP_CONFIG.ENDPOINT_CONFIG)[endpointId];
    return !!url;
  }

  /**
   * Return relevant URL according to path variables.
   * @param endpointId
   * @param pathVariables
   *  @param externalLink
   */
  private getUrl(endpointId: string, pathVariables?: any[], externalLink?: string): string {
    let url = this.configLoader.configurations.get(CONST.APP_CONFIG.ENDPOINT_CONFIG)[endpointId];

    if (pathVariables && pathVariables.length > 0) {
      const bracketPathVariables = url.match(/\{([^}]+)\}/g);
      pathVariables.forEach((pathVariable, i) => {
        if (bracketPathVariables && bracketPathVariables.length > 0) {
          url = url.replace(bracketPathVariables[i], pathVariable);
        } else {
          url = url + '/' + pathVariable;
        }
      });
    }
    // external HATEOAS links
    if (externalLink) {
      url += externalLink;
    }
    return url;
  }

  /**
   * Clear data store
   * @param dataKey
   * @private
   */
  private prepareDataStore(dataKey: DataKey) {
    // clear errors
    this.dataStore.set(DataKey.error, {});

    // if there is no entry for the given data key, create a new subject and store it there
    if (!this.dataStore.has(dataKey, true)) {
      this.dataStore.set(dataKey, new BehaviorSubject(null));
    }
  }

  /**
   * Process request headers and params
   * @param params
   * @private
   */
  private getRequestOptions(params?: HttpParams) {
    const requestOptionsArgs: RequestOptions = new RequestOptions();
    if (this.cookieService.get('Authorization')) {
      const token = this.cookieService.get('Authorization');
      requestOptionsArgs.headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    }
    // TODO- handle commonly used header
    requestOptionsArgs.headers = requestOptionsArgs.headers.set('X-Error-Response-Version', 'v1');
    requestOptionsArgs.headers = requestOptionsArgs.headers.set('Access-Control-Allow-Origin', '*');
    requestOptionsArgs.headers = requestOptionsArgs.headers.set('Source', 'mplus');

    // set additional headers if any
    const headers: KeyValue[] = this.headerService.getHeaders();
    headers.forEach((header) => {
      requestOptionsArgs.headers = requestOptionsArgs.headers.append(header.key, header.value.toString());
    });
    // if (!headers.some(header => header.key === 'Content-Type')) {
    //  // requestOptionsArgs.headers = requestOptionsArgs.headers.set('Content-Type', 'application/json');
    // }
    if (params) {
      requestOptionsArgs.params = params;
    }

    return requestOptionsArgs;
  }

  public loadUrl<T>(dataKey: DataKey, externalLink: string) {
    if (externalLink) {
      const url = externalLink;
      const requestOptionsArgs: RequestOptions = this.getRequestOptions();
      this.prepareDataStore(dataKey);

      // reset headers
      this.headerService.setHeaders([]);
      this.baseService.get<T>(url, requestOptionsArgs).subscribe(results => {
        const resultsWrapper = results.body;
        if (resultsWrapper) {
          this.dataStore.set(dataKey, resultsWrapper);
        }
      }, error => {
        // TODO - need error handling
        this.dataStore.set(dataKey, error);
      });
    } else {
      this.dataStore.set(dataKey, null);
    }
  }
}
