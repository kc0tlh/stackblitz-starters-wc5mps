import { Component, Inject, OnInit } from '@angular/core';
import { SnackbarData } from '../../../core/utils/ui/snackbar.service';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'mp-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData,
    @Inject(MatSnackBarRef) public snackBarRef: any) { }

  ngOnInit(): void {
  }

  public onDismiss() {
    this.snackBarRef.dismiss();
  }

}
