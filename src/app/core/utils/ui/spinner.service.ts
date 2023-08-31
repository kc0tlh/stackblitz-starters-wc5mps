import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class Spinner {
  private snackbarSubject = new Subject<SpinnerState>();
  public state = this.snackbarSubject.asObservable();

  constructor() {}

  public show(): void {
    this.snackbarSubject.next(<SpinnerState>{show: true});
  }

  public hide(): void {
    this.snackbarSubject.next(<SpinnerState>{show: false});
  }
}

export class SpinnerState {
  show: boolean;
}

