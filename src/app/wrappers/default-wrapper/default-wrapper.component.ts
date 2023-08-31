import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'mp-default-wrapper',
  templateUrl: './default-wrapper.component.html',
  styleUrls: ['./default-wrapper.component.scss']
})
export class DefaultWrapperComponent implements OnInit {

  @ViewChild('sidenav') sideNav?: MatSidenav;

  constructor() { }

  ngOnInit(): void {
  }

  onToggle() {
    this.sideNav?.toggle();
  }

  closeSideMenu() {
    this.sideNav?.close();
  }
}
