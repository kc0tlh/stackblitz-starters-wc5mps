import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { RequestOptions } from '../models/request-options';
import { Observable, throwError } from 'rxjs';
import { catchError, publishReplay, refCount } from 'rxjs/operators';

@Injectable()
export class BaseService {
  private requestOptionsArgs: RequestOptions = new RequestOptions();

  constructor(protected http: HttpClient) {}

  /**
   * Http GET request
   *      if cache enabled this tells Rx to cache the latest emitted value
   *      and tells Rx to keep the Observable alive as long as there are any Subscribers
   * @param {string} url
   * @param {RequestOptions} requestOptions
   * @param {boolean} cache
   * @returns {any}
   */
  public get<T>(url: string, requestOptions?: RequestOptions, cache: boolean = false): Observable<HttpResponse<T>> {
    const options = requestOptions ? requestOptions : new RequestOptions()
    //  this.createHeaders(options);

    if (cache) {
      return this.http.get<T>(url, {
        observe: 'response',
        headers: options.headers,
        params: options.params
      }).pipe(
        catchError(this.handleError),
        publishReplay(1),
        refCount()
      );
    } else {
      return this.http.get<T>(url, {
        observe: 'response',
        headers: options.headers,
        params: options.params
      }).pipe(
        catchError(this.handleError)
      );
    }
  }

  /**
   * Http POST request
   * @param url
   * @param body
   * @param requestOptions
   */
  public post<T>(url: string, body: any, requestOptions?: RequestOptions): Observable<HttpResponse<T>> {
    const options = requestOptions ? requestOptions : new RequestOptions()
    // this.createHeaders(options);

    const opts = options ? options : this.requestOptionsArgs;
    return this.http.post<T>(url, body, {
      observe: 'response',
      headers: opts.headers,
      params: opts.params
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Http PUT request
   * @param url
   * @param body
   * @param requestOptions
   */
  public put<T>(url: string, body: any, requestOptions?: RequestOptions): Observable<HttpResponse<T>> {
    const options = requestOptions ? requestOptions : new RequestOptions()
    // this.createHeaders(options);
    return this.http.put<T>(url, body, {
      observe: 'response',
      headers: options.headers,
      params: options.params
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Http PATCH request
   * @param url
   * @param body
   * @param requestOptions
   */
  public patch<T>(url: string, body: any, requestOptions?: RequestOptions): Observable<HttpResponse<T>> {
    const options = requestOptions ? requestOptions : new RequestOptions()
    //  this.createHeaders(options);
    return this.http.patch<T>(url, body, {
      observe: 'response',
      headers: options.headers,
      params: options.params
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Http DELETE request
   * @param url
   * @param requestOptions
   */
  public delete<T>(url: string, requestOptions?: RequestOptions): Observable<HttpResponse<T>> {
    const options = requestOptions ? requestOptions : new RequestOptions()
    // this.createHeaders(options);
    return this.http.delete<T>(url, {
      observe: 'response',
      headers: options.headers,
      params: options.params
    }).pipe(
      catchError(this.handleError)
    );
  }

  // public createHeaders(options: RequestOptions) {
  //   if (!options.headers) {
  //     options.headers = new HttpHeaders({'Content-Type': 'text/plain'});
  //   }
  // }

  /**
   * Write the HttpErrorResponse to Console as errors
   * @param error
   */
  private handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned error. status code ${error.status}, ` +
        `error code: ${error.error.error ? error.error.error.code : error.error.errors[0].code}, `
        + `message: ${error.error.error ? error.error.error.code.msg : error.error.errors[0].message}`);

    }
    return throwError(error);
  }
}
