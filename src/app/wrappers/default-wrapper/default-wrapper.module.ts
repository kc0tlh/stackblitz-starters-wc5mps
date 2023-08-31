import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DefaultWrapperRoutingModule } from './default-wrapper-routing.module';
import { DefaultWrapperComponent } from './default-wrapper.component';
import { QueryParamsService } from '../../core/utils/framework/query-params.service';
import { CommonHelper } from '../../core/utils/helpers/common-helper.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CONST } from '../../core/utils/constant';
import { DateFormatter } from '../../core/utils/helpers/date-formatter.service';
import { MatIconModule } from '@angular/material/icon';
import { AppHeaderModule } from '../../shared/components/app-header/app-header.module';
import { DialogModule } from '../../shared/components/dialog/dialog.module';
import { SnackBarModule } from '../../shared/components/snack-bar/snack-bar.module';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthGuard } from '../../core/services/auth.guard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    DefaultWrapperComponent
  ],
  imports: [
    CommonModule,
    DefaultWrapperRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AppHeaderModule,
    DialogModule,
    SnackBarModule,
    MatSidenavModule,
  ],
  exports: [],
  providers: [
    QueryParamsService,
    CommonHelper,
    CurrencyPipe,
    DateFormatter,
    AuthGuard,
    [{provide: MAT_DATE_LOCALE, useValue: CONST.DEFAULTS.DATE_LOCALE}],
    {provide: MatBottomSheetRef, useValue: {}},
  ]
})
export class DefaultWrapperModule {
}
