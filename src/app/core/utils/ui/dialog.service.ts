import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable()
export class DialogService {
  dialogRef: any;

  constructor(private dialog: MatDialog) {}

  public confirm(dialogData: DialogModel): Observable<any> {
    const config = new MatDialogConfig();
    config.data = dialogData;
    config.disableClose = dialogData.disableClose ? dialogData.disableClose : false;
    this.dialogRef = this.dialog.open(DialogComponent, config);

    return this.dialogRef.afterClosed();

  }
}

export class DialogModel {
  type: DIALOG_TYPE;
  title: string;
  message: string;
  primaryBtn: string;
  secondaryBtn: string;
  disableClose: boolean;
  panelClass: string;
  configData: Map<string, any> | null;
  hideCloseButton: boolean;

  constructor(type: DIALOG_TYPE, title: string, message: string, primaryBtn: string, secondaryBtn?: string, disableClose?: boolean, panelClass?: string, configData?: any, hideCloseButton?: boolean) {
    this.type = type;
    this.title = title;
    this.message = message;
    this.primaryBtn = primaryBtn;
    this.secondaryBtn = secondaryBtn ? secondaryBtn : '';
    this.disableClose = disableClose ? disableClose : false;
    this.panelClass = panelClass ? panelClass : '';
    this.configData = configData ? configData : null;
    this.hideCloseButton = hideCloseButton ?? false;
  }
}

export enum DIALOG_TYPE {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}
