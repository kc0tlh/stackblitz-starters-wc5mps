import { HttpHeaders, HttpParams } from '@angular/common/http';

export class RequestOptions {
  headers: HttpHeaders;
  params: HttpParams;

  constructor() {
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
  }
}
