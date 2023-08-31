import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Menu } from '../../../core/models/ui/menu';
import { ConfigLoader } from '../../../core/utils/framework/config-loader.service';
import { RouteManager } from '../../../core/utils/framework/route-manager.service';
import { NavItem } from '../../../core/models/ui/nav-item';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { CONST } from '../../../core/utils/constant';
import { MatRightSheet } from 'mat-right-sheet';
import { DataStore } from '../../../core/utils/framework/data-store.service';
import { AppService } from '../../../app.service';

@Component({
  selector: 'mp-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  public mainMenus: Menu[] = [];
  public iconMenus: Menu[] = [];
  public activeMenu: Menu = new Menu();
  public activeSubMenuId: string | null = null;
  public lastUpdateTime: string = '';
  public innerWidth: any;
  public activeSubMenuName ?: string

  public readonly CONST = CONST;

  @Output() menuClick: EventEmitter<any> = new EventEmitter();
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor(
    private configLoader: ConfigLoader,
    private routerManger: RouteManager,
    private cookieService: CookieService,
    private rightSheet: MatRightSheet,
    private dataStore: DataStore,
    private test: AppService) { }

  ngOnInit(): void {
    this.lastUpdateTime = moment().format('hh:mm A DD/MM/YYYY');
    // this.mainMenus = this.routerManger.mainMenus;
    // this.iconMenus = this.routerManger.iconMenus;

    // subscribing active Menu
    this.routerManger.activeMenu.subscribe(value => {
      this.activeMenu = value;
    });
    this.routerManger.activeSubMenu.subscribe(value => {
      this.activeSubMenuId = value;
      const filteredItems = this.activeMenu?.subItems.find(item => item.id === this.activeSubMenuId);
        this.activeSubMenuName = filteredItems?.title;
    });

    this.routerManger.mainMenusChange.subscribe(value => {
      this.mainMenus = value;
    });
    this.routerManger.iconMenusChange.subscribe(value => {
      this.iconMenus = value;
    });
   // console.log(this.routerManger.activeNavigationKey);
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  /**
   * menu click event
   * @param event
   * @param menu
   */
  public onMenuClick(menu: Menu) {
    // fire clevertap event

    if (menu.subItems && menu.subItems.length > 0) {
      const authorizedSubItems = menu.subItems.filter(x => x.hide === false);

      if (authorizedSubItems.length > 0) {
        this.routerManger.navigate(authorizedSubItems[0].id, menu.id);
      }
    } else {
      this.routerManger.navigate(menu.id, menu.id);
    }
  }

  /**
   * Sub menu click event
   * @param navItem
   */
  public onSubMenuClick(navItem: NavItem) {
    this.routerManger.navigate(navItem.id, this.activeMenu?.id);
  }

  /**
   * Home logo click event
   */
  public onHomeLogoClick() {
    this.routerManger.activeMenu.next(null);
    this.routerManger.activeSubMenu.next(null);
    this.routerManger.navigate('HOME', '', null, [CONST.QUERY_PARAMS.JOURNEY, CONST.QUERY_PARAMS.PAGE]);
  }

  public onMenuListView() {
    this.toggle.emit();
  }

  /**
   * More menu click event
   * @param type
   */
  public onMore(type: string) {
    if (type === 'CONTACT_US') {
      this.routerManger.activeMenu.next(null);
      this.routerManger.activeSubMenu.next(null);
      this.routerManger.navigate('CONTACT_US', '', null, [CONST.QUERY_PARAMS.JOURNEY, CONST.QUERY_PARAMS.PAGE]);
    } else if (type === 'LOGOUT') {
      this.cookieService.delete('Authorization');
      localStorage.removeItem('role');
      this.dataStore.clearAll();
      this.routerManger.navigate('LOGIN', '' , null, [CONST.QUERY_PARAMS.PAGE, CONST.QUERY_PARAMS.JOURNEY]);
    }
  }
}
