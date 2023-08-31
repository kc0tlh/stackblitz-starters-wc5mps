import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FeedbackPagination,
  ItemComment,
  ItemRatings,
  ItemsRankings
} from '../../core/models/api/responses/menu-items';
import { Subscription } from 'rxjs';
import { DataKey, DataStore } from '../../core/utils/framework/data-store.service';
import { Spinner } from '../../core/utils/ui/spinner.service';
import { ConfigLoader } from '../../core/utils/framework/config-loader.service';
import { Snackbar } from '../../core/utils/ui/snackbar.service';
import { RankingCommentsComponent } from './ranking-comments/ranking-comments.component';
import {
  CustomerFeedbackOrderDetailsComponent
} from '../../shared/components/customer-feedback-order-details/customer-feedback-order-details.component';
import { CONST } from '../../core/utils/constant';
import { FeedbackServiceHandler } from '../../core/services/service-handlers/feedback-service-handler';
import { ModalService } from '../../core/utils/ui/modal.service';
import { OrderOptions } from '../../core/models/api/responses/order-details';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'mp-menu-items',
  templateUrl: './feedback-menu-items.component.html',
  styleUrls: ['./feedback-menu-items.component.scss']
})
export class FeedbackMenuItemsComponent implements OnInit, OnDestroy {

  private itemRankingsSubscription: Subscription = new Subscription();
  private itemCommentsSubscription: Subscription = new Subscription();
  private menuItemsConfig = this.configLoader.configurations.get(CONST.APP_CONFIG.SYSTEM_CONFIG)?.menuItems;
  private showFeedbackDetails: boolean = this.menuItemsConfig?.showFeedbackDetails;
  private showOrderDetails: boolean = this.menuItemsConfig?.showOrderDetails;
  private pageSize: number = this.configLoader.configurations.get(CONST.APP_CONFIG.SYSTEM_CONFIG)?.commons?.paginationPageSize;


  public itemsRankings: ItemsRankings[] = [];
  public menuItemsComments: ItemComment[] = [];
  public itemsRankingPagination: FeedbackPagination = new FeedbackPagination();
  public itemsCommentsPagination: FeedbackPagination = new FeedbackPagination();
  public totalRankingsCount: number = 0;
  public totalCommentsCount: number = 0;
  public itemRating = ItemRatings;
  public readonly ASCENDING_ORDER: string = 'ASC';
  public readonly DESCENDING_ORDER: string = 'DSC';
  public selectedSorting: string = this.DESCENDING_ORDER;
  public dataSource = new MatTableDataSource<ItemsRankings>();
  public dateFormat: string = CONST.DATE_FORMATTERS.DATE_FORMAT_SLASH_YEAR_TIME;
  public readonly CONST = CONST;

  public mockComments: ItemComment[] = [{
    comment: "",
    job_id: 137985144,
    menu_item_id: 276060,
    menu_item_name: "Test 1",
    rated_timestamp: "2023-08-02 10:55:11",
    rating: 1
  }, {
    comment: "",
    job_id: 137985132,
    menu_item_id: 277081,
    menu_item_name: "Rice",
    rated_timestamp: "2023-07-28 15:32:19",
    rating: 1,
  }, {
    comment: "",
    job_id: 137984795,
    menu_item_id: 275865,
    menu_item_name: "Packaging",
    rated_timestamp: "2023-07-25 16:28:20",
    rating: 1
  }]
  public mockItemRankings = [{
    "item_id": 276060,
    "item_name": "Test 1",
    "rating_percentage": 100,
    "ranking": 1,
    "image_url": "",
    "like_count": 1,
    "dislike_count": 0,
    "comments_count": 1
  },{
    "item_id": 277081,
    "item_name": "Rice",
    "rating_percentage": 100,
    "ranking": 2,
    "image_url": "",
    "like_count": 1,
    "dislike_count": 0,
    "comments_count": 1
  }]

  public mockOrderOptions: OrderOptions[] = []

  public mockOrderDetails: {
    job_id: 137985144,
    passenger_firstname: "Hasara",
    merchant_rating: 1,
    passenger_order_count: 164,
    job_created_timestamp: "2023-07-28 15:39:00",
    job_completed_timestamp: "2023-07-28 15:39:24",
    subtotal_order_amount: "10.00",
    merchant_discount: "",
    total_order_amount: "10.00",
    order_details: [
      {
        item_id: 276060,
        name: "Test 1",
        qty: 1,
        row_total: "10.00",
        item_total: "10.00",
        sp_ins: "",
        order_options: []
      }
    ]
  }

  constructor(
    private feedbackService: FeedbackServiceHandler,
    private dataStore: DataStore,
    private spinner: Spinner,
    private configLoader: ConfigLoader,
    private snackBar: Snackbar,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.itemsRankingPagination.page_limit = this.pageSize;
    this.observeMenuItemsRankings();
    this.observeMenuItemsComments();
  }

  ngOnDestroy(): void {

    if (this.itemCommentsSubscription) {
      this.itemCommentsSubscription.unsubscribe();
    }
    if (this.itemRankingsSubscription) {
      this.itemRankingsSubscription.unsubscribe();
    }
  }

  /**
   * observe and load menu items rankings
   * @private
   */
  private observeMenuItemsRankings() {
    this.spinner.show();
    this.itemsRankings = this.mockItemRankings
    this.spinner.hide()

  }

  /**
   * observe and load menu items comments
   * @private
   */
  private observeMenuItemsComments() {
    this.spinner.show();
    this.menuItemsComments = this.mockComments
    this.totalCommentsCount = 5;
    this.spinner.hide()

  }

  /**
   * get specific order details
   * @param orderId
   */
  public getOrderDetails(orderId: number) {
    let feedbackDetails = this.mockOrderDetails
    this.openOrderDetails(feedbackDetails);

  }

  /**
   * open order details modal
   * @param orderDetails
   * @private
   */
  private openOrderDetails(orderDetails: any) {
    const orderInfo = {
      feedbackDetails: orderDetails,
      showFeedbackDetails: this.showFeedbackDetails,
      showOrderDetails: this.showOrderDetails
    };
    this.modalService.open(
      {component: CustomerFeedbackOrderDetailsComponent, data: {orderInfo: orderInfo}},
      'RIGHT', 'RIGHT', 'BOTTOM',
      {disableClose: true, backdropClass: 'right-sheet-width'});

  }

  public openComments(ranking: ItemsRankings) {
    const itemRanking = {ranking: ranking};
    this.modalService.open(
      {component: RankingCommentsComponent, data: {itemRanking: itemRanking}},
      'RIGHT','RIGHT', 'BOTTOM',
      {disableClose: true, backdropClass: 'right-sheet-width'});

  }

  /**
   * sorting the array
   * @param order
   */
  public sortRankings(order: string) {
    if (order === this.ASCENDING_ORDER) {
      this.itemsRankings = this.itemsRankings.sort(function (a, b) { return a.rating_percentage - b.rating_percentage; });
      this.selectedSorting = this.ASCENDING_ORDER;
    } else {
      this.itemsRankings = this.itemsRankings.sort(function (a, b) { return b.rating_percentage - a.rating_percentage; });
      this.selectedSorting = this.DESCENDING_ORDER;
    }
  }

  /**
   * pagination event for ranking
   * @param event
   */
  public onRankingPaginated(event: PageEvent) {
    this.itemsRankingPagination.page_limit = event.pageSize;
    this.itemsRankingPagination.offset = event.pageIndex;
    // this.feedbackService.getItemRankings(this.itemsRankingPagination);
    this.observeMenuItemsRankings();
  }

  /**
   * pagination event for comments
   * @param event
   */
  public onCommentPaginated(event: PageEvent) {
    this.itemsCommentsPagination.page_limit = event.pageSize;
    this.itemsCommentsPagination.offset = event.pageIndex;
    // this.feedbackService.getItemComments(this.itemsCommentsPagination);
    this.observeMenuItemsComments();
  }

}
