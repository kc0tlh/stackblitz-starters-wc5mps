import { Injectable, ViewContainerRef } from '@angular/core';
import { MatRightSheet } from 'mat-right-sheet';
import { RightBottomSheetComponent } from '../../../shared/components/right-bottom-sheet/right-bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Direction } from '@angular/cdk/bidi';
import { ScrollStrategy } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class ModalService {

  private onCloseModal = new Subject();
  private eventSubjectMap: Map<String, BehaviorSubject<any>> = new Map<String, BehaviorSubject<any>>();

  constructor(
    private rightSheet: MatRightSheet,
    private bottomSheet: MatBottomSheet) {
  }

  /**
   * Open Right Sheet or Bottom Sheet
   * @param data - Data being injected into the child component.
   * @param desktop - Desktop view type - 'RIGHT' or 'BOTTOM'
   * @param tablet - Tablet view type - 'RIGHT' or 'BOTTOM'
   * @param mobile - Mobile view type - 'RIGHT' or 'BOTTOM'
   * @param modalConfig - Modification configs
   */
  public open(data: any, desktop?: 'RIGHT' | 'BOTTOM', tablet?: 'RIGHT' | 'BOTTOM', mobile?: 'RIGHT' | 'BOTTOM', modalConfig?: ModalConfig) {
    let config = new ModalConfig();
    if (modalConfig) {
      config = modalConfig;
    }
    config.data = data;

    if (this.isMobileDevice) {
      this.openSheet(config, mobile);
    } else if (this.isTabletDevice) {
      this.openSheet(config, tablet);
    } else {
      this.openSheet(config, desktop);
    }
  }

  /**
   * Open Right Sheet or Bottom Sheet based on the placement
   */
  private openSheet(config: ModalConfig, placement?: string) {
    if (placement === 'RIGHT')
      this.rightSheet.open(RightBottomSheetComponent, config);
    if (placement === 'BOTTOM')
      this.bottomSheet.open(RightBottomSheetComponent, config);
  }

  /**
   * Close all right sheets and bottom sheets
   */
  public close(result?: any) {
    this.rightSheet.dismiss();
    this.bottomSheet.dismiss();
    this.onCloseModal.next(result);
    this.eventSubjectMap.clear();
  }

  /**
   *  Capture data passed as result parameter in the close function
   */
  public afterDismissed(): Observable<any> {
    return this.onCloseModal;
  }

  /**
   *  set value for event subject
   */
  public emitData(event: string, result: any) {
    const behaviorSubject = this.eventSubjectMap.get(event) ?? new BehaviorSubject<any>(null);
    this.eventSubjectMap.set(event, behaviorSubject);
    behaviorSubject.next(result);
  }

  /**
   *  capture event value on change
   */
  public afterEvent(event: string): Observable<any> {

    if (!this.eventSubjectMap.get(event)) {
      this.eventSubjectMap.set(event, new BehaviorSubject<any>(null));
    }
    return this.eventSubjectMap.get(event) ?? new BehaviorSubject<any>(null);
  }

  get isMobileDevice(): boolean {
    return window.innerWidth <= 480;
  }

  get isTabletDevice(): boolean {
    return window.innerWidth > 481 && window.innerWidth <= 768;
  }

}

export class ModalData {
  component: any;
  data: any;

  constructor() {
    this.component = null;
    this.data = null;
  }
}

export class ModalConfig {
  /**The view container to place the overlay for the bottom sheet into.*/
  viewContainerRef?: ViewContainerRef;

  /** Extra CSS classes to be added to the bottom sheet container. */
  panelClass?: string | string[];

  /** Text layout direction for the bottom sheet. */
  direction?: Direction;

  /** Data being injected into the child component. */
  data?: any | null;

  /** Whether the bottom sheet has a backdrop. */
  hasBackdrop?: boolean;

  /** Custom class for the backdrop. */
  backdropClass?: string;

  /** Whether the user can use escape or clicking outside to close the bottom sheet. */
  disableClose?: boolean;

  /** Aria label to assign to the bottom sheet element. */
  ariaLabel?: string | null;

  /**
   * Whether the bottom sheet should close when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  closeOnNavigation?: boolean;
  /** Whether the bottom sheet should focus the first focusable element on open. */
  autoFocus?: boolean;
  /**
   * Whether the bottom sheet should restore focus to the
   * previously-focused element, after it's closed.
   */
  restoreFocus?: boolean;
  /** Scroll strategy to be used for the bottom sheet. */
  scrollStrategy?: ScrollStrategy;
}
