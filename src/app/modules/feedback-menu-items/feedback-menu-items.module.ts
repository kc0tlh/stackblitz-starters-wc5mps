
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from '../../shared/directives/directive.module';
import { DateFormatter } from '../../core/utils/helpers/date-formatter.service';
import { HttpParams } from '@angular/common/http';
import { FeedbackMenuItemsComponent } from './feedback-menu-items.component';
import { FeedbackMenuItemsRoutingModule } from './feedback-menu-items.routing.module';
import { MAT_RIGHT_SHEET_DATA, MatRightSheet } from 'mat-right-sheet';
import { FeedbackServiceHandler } from '../../core/services/service-handlers/feedback-service-handler';
import { RankingCommentsComponent } from './ranking-comments/ranking-comments.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ModalService } from '../../core/utils/ui/modal.service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { DynamicRenderer } from '../../core/utils/ui/dynamic-renderer.service';
import { DocumentGenerateService } from '../../core/services/document-generate.service';
import {
  CustomerFeedbackOrderDetailsComponent
} from '../../shared/components/customer-feedback-order-details/customer-feedback-order-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

const materialModules = [
  MatTableModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  InfiniteScrollModule,
  MatListModule,
  MatMenuModule
];

@NgModule({
  declarations: [
    FeedbackMenuItemsComponent,
    RankingCommentsComponent,
    CustomerFeedbackOrderDetailsComponent
  ],
    imports: [
        FeedbackMenuItemsRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectiveModule,
        ...materialModules,
        MatButtonModule,
    ],
  providers: [
    DateFormatter,
    HttpParams,
    DocumentGenerateService,
    FeedbackServiceHandler,
    ModalService,
    DynamicRenderer,
    MatBottomSheet,
    {provide: MAT_BOTTOM_SHEET_DATA, useValue: {}},
    MatRightSheet,
    {provide: MAT_RIGHT_SHEET_DATA, useValue: {}},
  ],
})
export class FeedbackMenuItemsModule {
}
