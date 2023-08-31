import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from '../../../../core/models/ui/menu';
import { RouteManager } from '../../../../core/utils/framework/route-manager.service';
import { CONST } from '../../../../core/utils/constant';
import { ConfigLoader } from '../../../../core/utils/framework/config-loader.service';
import { NavItem } from '../../../../core/models/ui/nav-item';

@Component({
  selector: 'mp-mobile-app-header',
  templateUrl: './mobile-app-header.component.html',
  styleUrls: ['./mobile-app-header.component.scss']
})
export class MobileAppHeaderComponent implements OnInit {

  public mainMenus: Menu[] = [];
  public activeMenu: Menu = new Menu();
  public readonly CONST = CONST;



  @Output() closeSideMenu: EventEmitter<any> = new EventEmitter();

  constructor(private routerManger: RouteManager,
              private configLoader: ConfigLoader,

  ) {
  }

  ngOnInit(): void {
    this.routerManger.mainMenusChange.subscribe(value => {
      this.mainMenus = value;
    });
    this.routerManger.activeMenu.subscribe(value => {
      this.activeMenu = value;
    });
  }
  /**
   * menu click event
   * @param event
   * @param menu
   */
  public onMenuClick(menu: Menu) {
    // fire clevertap event
    this.activeMenu = menu;
    if(menu.subItems.length == 0) {
      this.routerManger.activeMenu.next(this.activeMenu);
      this.routerManger.activeSubMenu.next(null);
      this.routerManger.navigate(menu.id, this.activeMenu.id);
    }
  }


  onClose() {
    this.closeSideMenu.emit();
  }

  public onSubMenuClick(navItem: NavItem) {
    this.routerManger.activeMenu.next(this.activeMenu);
    this.routerManger.activeSubMenu.next(navItem.id.toUpperCase());
    this.routerManger.navigate(navItem.id, this.activeMenu.id);
  }
}
