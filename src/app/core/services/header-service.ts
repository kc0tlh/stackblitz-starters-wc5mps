import { Injectable } from '@angular/core';
import { KeyValue } from '../models/ui/key-value';

@Injectable()
export class HeaderService {
  private headers: KeyValue[] = [];

  public setHeaders(headers: KeyValue[]): void {
    this.headers = headers;
  }

  public getHeaders(): KeyValue[] {
    return this.headers;
  }

  public append(name:string, value:string){
    const keyValue = new KeyValue();
    keyValue.key = name;
    keyValue.value = value;
    this.headers.push(keyValue);
  }
}
