import { Injectable } from '@angular/core';
import { ConfigLoader } from './config-loader.service';
import { NavItem } from '../../models/ui/nav-item';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParamsService } from './query-params.service';
import { CONST } from '../constant';
import { BehaviorSubject } from 'rxjs';
import { Menu, MenuType } from '../../models/ui/menu';
import { CommonHelper } from '../helpers/common-helper.service';
import { DataKey, DataStore } from './data-store.service';
import { CleverTapService } from '../helpers/clever-tap.service';
import clevertap from 'clevertap-web-sdk';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class RouteManager {

  public activeMenu: BehaviorSubject<any> = new BehaviorSubject(null);
  public activeSubMenu: BehaviorSubject<any> = new BehaviorSubject(null);
  public mainMenusChange: BehaviorSubject<any> = new BehaviorSubject(null);
  public iconMenusChange: BehaviorSubject<any> = new BehaviorSubject(null);
  public activeNavigationKey: string;
  public mainMenus: Menu[] = [];
  public iconMenus: Menu[] = [];
  public menus: Menu[] = [];
  public navItems: NavItem[] = []

  constructor(
    private configLoader: ConfigLoader,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private queryParamService: QueryParamsService,
    private commonHelper: CommonHelper,
    private dataStore: DataStore,
    private cleverTapService: CleverTapService,
    private cookieService: CookieService,
    ) {
    this.loadMenus();
    this.loadNavItems();
  }

  /**
   * Using for handle route navigations
   * @param key - Navigation Config ID
   * @param menuId - Menu Config ID,
   * @param qParams - Query params that want to add URL when navigating
   * @param removeParams - Query params that want to remove from URL hen navigating
   */
  public navigate(key: string, menuId?: string, qParams?: Map<string, any> | null, removeParams?: Array<string>) {
    const navItem: NavItem = this.configLoader.configurations.get(CONST.APP_CONFIG.NAVIGATION_CONFIG)[key];
    // load all existing params
    const params = this.activatedRoute.snapshot.queryParams;
    let tmpParams = {};
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        tmpParams[key] = params[key];
      }
    }
    // set additional params as well from the query map
    if (qParams) {
      qParams.forEach((value: string, key: string) => {
        tmpParams[key] = value;
      });
    }
    if (menuId) {
      tmpParams = {}; // Clear Params When Having MenuID
      tmpParams['journey'] = menuId.toLowerCase();
      tmpParams['page'] = navItem.id.toLowerCase();

    }

    // removing query params
    if (removeParams && removeParams.length > 0) {
      removeParams.forEach((param: any) => {
        delete tmpParams[param];
      });
    }
    switch (navItem.target) {
      case CONST.ROUTE_TARGETS.TARGET_TAB:
        // open in a new tab
        window.open(navItem.url + this.queryParamService.asString(tmpParams));
        break;
      case CONST.ROUTE_TARGETS.TARGET_WINDOW:
        // open in a new window
        window.open(navItem.url + this.queryParamService.asString(tmpParams), '_blank', 'resizable');
        break;
      case CONST.ROUTE_TARGETS.TARGET_PAGE:
        this.router.navigate([navItem.url], {
          queryParams: tmpParams,
        });
        break;
      case CONST.ROUTE_TARGETS.TARGET_REFRESH:
        // open with refresh
        window.open(navItem.url + this.queryParamService.asString(tmpParams), '_self', 'resizable');
        break;
      case CONST.ROUTE_TARGETS.TARGET_LINK:
        // navigate to external link
        const environmentConfig = this.configLoader.configurations.get(CONST.APP_CONFIG.ENVIRONMENT_CONFIG);
        let url = navItem.url;
        const bracketValue = url.match(/\{(.*?)\}/);
        if (bracketValue) {
          const host = bracketValue[1]; //mPlus_client
          const env = environmentConfig.env;
          if (env) {
            url = url.replace(bracketValue[0], environmentConfig[host][env]);
            if (this.cookieService.check('Authorization') && localStorage.getItem('role')) {
              tmpParams['token'] = this.cookieService.get('Authorization');
              tmpParams['mPlus_client'] = environmentConfig.env; // LOCAL, DEV, ESTG, PROD
              tmpParams['role'] = localStorage.getItem('role');
              url = url + this.queryParamService.asString(tmpParams);
            }
          }
        }
        window.location.href = url;
        break;
      default:
        this.router.navigate([navItem.url], {
          queryParams: tmpParams
        });
    }
  }

  /**
   * Load Menus by Menu config file and storing as global
   */
  public loadMenus() {
    const userRole = localStorage.getItem('role');
    if (userRole) {
      this.loadMenuBasedOnRole(userRole);
    } else {
      const userRoleSub = this.dataStore.get(DataKey.userRole, true).subscribe((userRole: string) => {
        if (this.activatedRoute.snapshot.queryParams['role']) {
          localStorage.setItem('role', userRole);
          this.loadMenuBasedOnRole(userRole);
          userRoleSub.unsubscribe();
        }
      });
    }
  }

  private loadMenuBasedOnRole(userRole: string) {
    this.mainMenus = [];
    this.iconMenus = [];
    const mainMenuConfigs = this.configLoader.configurations.get(CONST.APP_CONFIG.MENU_CONFIG);
    const navigationConfigs = this.configLoader.configurations.get(CONST.APP_CONFIG.NAVIGATION_CONFIG);
    const userConfigs = this.configLoader.configurations.get(CONST.APP_CONFIG.USER_CONFIG);
    let userRoleMenus: string[] = userConfigs['MERCHANT'].menus;

    if (userRole) {
      if (userRole === '1') {
        userRoleMenus = userConfigs['ADMIN'].menus;
      }

      for (const key in mainMenuConfigs) {
        if (mainMenuConfigs.hasOwnProperty(key)) {
          const menu = new Menu();
          menu.id = mainMenuConfigs[key]['id'];
          menu.title = mainMenuConfigs[key]['title'];
          menu.hide = mainMenuConfigs[key]['hide'];
          menu.hideInMobile = mainMenuConfigs[key]['hideInMobile'];
          menu.disable = mainMenuConfigs[key]['disable'];
          if (mainMenuConfigs[key]['icon']) {
            menu.icon = mainMenuConfigs[key]['icon'];
          }
          // validate Main menu show/hide by given restrict key
          this.validateMenus(menu, mainMenuConfigs[key]);
          menu.subItems = [];
          if (mainMenuConfigs[key]['subItems']) {
            mainMenuConfigs[key]['subItems'].forEach((item: string) => {
              let navItem = new NavItem();
              if (navigationConfigs[item]) {
                navItem = navigationConfigs[item];
                // validate Sub menu show/hide by given restrict key
                this.validateMenus(navItem, navigationConfigs[item]);
                menu.subItems.push(navItem);
              }
            });
          }
          if (userRoleMenus.some(userMenu => userMenu === menu.id)) {
            this.menus.push(menu);
            if (mainMenuConfigs[key]['type'] === MenuType.MAIN) {
              this.mainMenus.push(menu);
            } else if (mainMenuConfigs[key]['type'] === MenuType.ICON) {
              this.iconMenus.push(menu);
            }
          }
        }
      }
      this.mainMenusChange.next(this.mainMenus);
      this.iconMenusChange.next(this.iconMenus);

    }


  }

  /**
   * Load Nav Items by Navigation config file
   */
  private loadNavItems() {
    const navigationConfigs = this.configLoader.configurations.get(CONST.APP_CONFIG.NAVIGATION_CONFIG);
    for (const key in navigationConfigs) {
      if (navigationConfigs.hasOwnProperty(key)) {
        const navItem = new NavItem();
        navItem.id = navigationConfigs[key]['id'];
        navItem.title = navigationConfigs[key]['title'];
        navItem.url = navigationConfigs[key]['url'];
        navItem.target = navigationConfigs[key]['target'];
        this.navItems.push(navItem);
      }
    }
  }

  /**
   * validate Main or Sub menu, show/hide by given restrict key
   * @param menu
   * @param menuConfigKey
   * @private
   */
  private validateMenus(menu: Menu | NavItem, menuConfigKey: any) {
    let userConfigs = [];
    if (menuConfigKey['hide']) {
      menu.hide = menuConfigKey['hide'];
    }
    // this.dataStore.get(DataKey.getUserConfigs).subscribe((response: any) => {
    //   if (response && response.data && response.data.length > 0) {
    //     userConfigs = response.data;
    //     const filteredValue = userConfigs.filter((config: any) => config.name === menuConfigKey['restrictKey']);
    //     if (filteredValue && filteredValue.length > 0) {
    //       menu.hide = filteredValue[0].value !== 'true';
    //     }
    //   }
    // });
  }

  /**
   * Add Query params to URL
   * @param qParams
   */
  public addParamsToUrl(qParams: Map<string, any>) {
    // load all existing params
    const params = this.activatedRoute.snapshot.queryParams;
    const tmpParams = {};
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        tmpParams[key] = params[key];
      }
    }
    // set additional params from the query map
    if (qParams) {
      qParams.forEach((value: string, key: string) => {
        tmpParams[key] = value;
      });
    }
    this.router.navigate([], {
      queryParams: tmpParams,
    });
  }

  public removeParams(params: string[]) {
    const existingParams = this.commonHelper.deepCopy(this.activatedRoute.snapshot.queryParams);
    params.forEach((param: any) => {
      delete existingParams[param];
    });
    setTimeout(() => {
      this.router.navigate([], {
        queryParams: existingParams,
        relativeTo: this.activatedRoute,
        replaceUrl: true
      });
    }, 0);
  }
}
