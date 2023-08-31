import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { ConfigLoader } from './core/utils/framework/config-loader.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouteManager } from './core/utils/framework/route-manager.service';
import { QueryParamsService } from './core/utils/framework/query-params.service';
import { CommonHelper } from './core/utils/helpers/common-helper.service';
import { CookieService } from 'ngx-cookie-service';
import { Snackbar } from './core/utils/ui/snackbar.service';
import { ErrorInterceptor } from './core/services/error-interceptor.service';
import { DialogService } from './core/utils/ui/dialog.service';
import { MatIconModule } from '@angular/material/icon';
import { Spinner } from './core/utils/ui/spinner.service';
import { UserServiceHandler } from './core/services/service-handlers/user-service-handler';
import { DataLoaderService } from './core/services/data-loader.service';
import { DataStore } from './core/utils/framework/data-store.service';
import { HeaderService } from './core/services/header-service';
import { BaseService } from './core/services/base-service';
import { CleverTapService } from './core/utils/helpers/clever-tap.service';
import { InvalidTokenDialogModule } from './shared/components/invalid-token-dialog/invalid-token-dialog.module';
import { SpinnerModule } from './shared/components/spinner/spinner.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

export function initialize(app: AppService) {
  return async () => {
    await app.loadConfigurations();
  };
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        MatIconModule,
        InvalidTokenDialogModule,
        SpinnerModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initialize,
            deps: [AppService],
            multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AppService,
        ConfigLoader,
        RouteManager,
        QueryParamsService,
        CommonHelper,
        CookieService,
        Snackbar,
        Spinner,
        DialogService,
        UserServiceHandler,
        DataLoaderService,
        DataStore,
        HeaderService,
        BaseService,
        CleverTapService
    ],
    exports: [
        CommonModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
