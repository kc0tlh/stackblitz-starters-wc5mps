import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { RouteManager } from './core/utils/framework/route-manager.service';
import { Menu } from './core/models/ui/menu';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Snackbar, SnackBarStates } from './core/utils/ui/snackbar.service';
import { SnackBarComponent } from './shared/components/snack-bar/snack-bar.component';
import { NavItem } from './core/models/ui/nav-item';
import { UserServiceHandler } from './core/services/service-handlers/user-service-handler';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigLoader } from './core/utils/framework/config-loader.service';
import { DataKey, DataStore } from './core/utils/framework/data-store.service';
import { Spinner, SpinnerState } from './core/utils/ui/spinner.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mp-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  private menus: Menu[] = [];
  private navItems: NavItem[] = [];
  private snackBarSubscription: Subscription = new Subscription();

  public loginURL: any;

  public showSpinner: boolean = false;
  private spinnerSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routerManager: RouteManager,
    private cookieService: CookieService,
    private snackBarService: Snackbar,
    private userServiceHandler: UserServiceHandler,
    public snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private configloader: ConfigLoader,
    private dataStore: DataStore,
    private spinner: Spinner,
    private http: HttpClient,
    private _elementRef: ElementRef) {}

  ngOnInit() {
    this._elementRef.nativeElement.removeAttribute('ng-version');
    this.menus = this.routerManager.menus;
    this.navItems = this.routerManager.navItems;
    this.handleAppRouterEvents();
    this.loadSnackBar();
    this.loadSpinner();
  }

  ngOnDestroy() {
    if (this.snackBarSubscription) {
      this.snackBarSubscription.unsubscribe();
    }
  }
  ngAfterViewInit(){
  }


  private loadSpinner() {
    this.spinnerSubscription = this.spinner.state.subscribe((state: SpinnerState) => {
      setTimeout(() => this.showSpinner = state && state.show, 0);
    });
  }

  private handleAppRouterEvents() {
  }

  private loadSnackBar() {
    this.snackBarSubscription = this.snackBarService.state.subscribe((state: SnackBarStates) => {
      if (state && state.show) {
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: state.data,
          duration: state.data.duration,
          panelClass: [state.data.type],
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
      }
    });
  }
}
