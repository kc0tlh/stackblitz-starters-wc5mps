import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_TYPE, DialogModel } from '../../../core/utils/ui/dialog.service';
import { DialogResponse } from './dialog-response';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mp-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public readonly INFO = DIALOG_TYPE.INFO;
  public readonly SUCCESS = DIALOG_TYPE.SUCCESS;
  public readonly WARNING = DIALOG_TYPE.WARNING;
  public readonly ERROR = DIALOG_TYPE.ERROR;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogModel
  ) { }

  ngOnInit(): void {
  }

  /**
   * Primary button click event
   */
  onPrimaryBtnClick() {
    this.dialogRef.close(DialogResponse.YES);
  }

  /**
   * Secondary button click event
   */
  onSecondaryBtnClick() {
    this.dialogRef.close(DialogResponse.NO);
  }
}
