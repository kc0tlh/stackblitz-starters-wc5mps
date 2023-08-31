import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { InvalidTokenDialogComponent } from './invalid-token-dialog.component';
import { MatRightSheetModule } from 'mat-right-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const materialModules = [
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatRightSheetModule
];

@NgModule({
  declarations: [
    InvalidTokenDialogComponent
  ],
  exports: [
    InvalidTokenDialogComponent,
  ],
  imports: [
    CommonModule,
    ...materialModules
  ]
})
export class InvalidTokenDialogModule { }
