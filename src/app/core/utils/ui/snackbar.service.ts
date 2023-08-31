import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class Snackbar {
  private snackbarSubject = new Subject<SnackBarStates>();
  public state = this.snackbarSubject.asObservable();

  constructor() {}

  /**
   * Snack bar show method
   * @param type - ALERT_TYPE = 'info' | 'success' | 'warn' | 'error'
   * @param title - title
   * @param message - message
   * @param dismissDuration - dismiss duration (mile seconds)
   */
  public show(type: ALERT_TYPE, title: string, message?: string, dismissDuration?: number): void {
    const snackBarData = new SnackbarData();
    snackBarData.type = type;
    snackBarData.title = title;
    snackBarData.message = message ? message : '';
    snackBarData.duration = dismissDuration ? dismissDuration : -1;
    this.snackbarSubject.next(<SnackBarStates>{show: true, data: snackBarData});
  }
}

export class SnackbarData {
  type: ALERT_TYPE;
  title: string;
  message: string;
  duration: number;
}

export enum ALERT_TYPE {
  INFO = 'info',
  SUCCESS = 'success',
  WARN = 'warn',
  ERROR = 'error'
}

export class SnackBarStates {
  show: boolean;
  data: SnackbarData;
}
