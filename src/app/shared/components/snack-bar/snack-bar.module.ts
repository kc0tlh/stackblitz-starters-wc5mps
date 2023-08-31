import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarComponent } from './snack-bar.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SnackBarComponent
  ],
  exports: [
    SnackBarComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class SnackBarModule { }
