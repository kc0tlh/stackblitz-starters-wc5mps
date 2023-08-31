import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DialogComponent
  ],
  exports: [
    DialogComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class DialogModule {
}
