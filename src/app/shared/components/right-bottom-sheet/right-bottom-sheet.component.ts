import { Component, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_RIGHT_SHEET_DATA } from 'mat-right-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DynamicRenderer } from '../../../core/utils/ui/dynamic-renderer.service';
import { ModalData } from '../../../core/utils/ui/modal.service';

@Component({
  selector: 'mp-right-bottom-sheet',
  templateUrl: './right-bottom-sheet.component.html',
  styleUrls: ['./right-bottom-sheet.component.scss']
})
export class RightBottomSheetComponent implements OnInit {

  @ViewChild('dynamic', { read: ViewContainerRef, static: true })
  viewContainerRef: ViewContainerRef;

  constructor(
    private dynamicRenderer: DynamicRenderer,
    @Inject(MAT_RIGHT_SHEET_DATA) public rightSheetData: any,
    @Inject(MAT_BOTTOM_SHEET_DATA) public bottomSheetData: any)
  { }

  ngOnInit(): void {
    this.dynamicRenderer.setRootViewContainerRef(this.viewContainerRef);

    let modalData: ModalData;
    Object.keys(this.rightSheetData).length > 0 ? modalData = this.rightSheetData : modalData = this.bottomSheetData;
    this.dynamicRenderer.addDynamicComponent(modalData.component, modalData.data);
  }
}
