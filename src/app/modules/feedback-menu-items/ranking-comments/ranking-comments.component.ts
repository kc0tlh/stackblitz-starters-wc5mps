import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataKey, DataStore } from '../../../core/utils/framework/data-store.service';
import { Spinner } from '../../../core/utils/ui/spinner.service';
import { Subscription } from 'rxjs';
import { ItemRating, MenuItemComment } from '../../../core/models/api/responses/overview-ratings';
import { FeedbackPagination, ItemRatings, ItemsRankings } from '../../../core/models/api/responses/menu-items';
import { CONST } from '../../../core/utils/constant';
import { ConfigLoader } from '../../../core/utils/framework/config-loader.service';
import { FeedbackServiceHandler } from '../../../core/services/service-handlers/feedback-service-handler';
import { ModalService } from '../../../core/utils/ui/modal.service';

@Component({
  selector: 'mp-ranking-comments',
  templateUrl: './ranking-comments.component.html',
  styleUrls: ['./ranking-comments.component.scss']
})
export class RankingCommentsComponent implements OnInit, OnDestroy {

  @Input() itemRanking: any

  private itemRankingSubscription: Subscription = new Subscription()
  private rankingPagination: FeedbackPagination = new FeedbackPagination();
  private pageSize: number = this.configLoader.configurations.get(CONST.APP_CONFIG.SYSTEM_CONFIG)?.commons?.paginationPageSize;

  public allComments: MenuItemComment[] = [];
  public isLoaded: boolean = false;
  public itemRatings: ItemRating = new ItemRating();
  public ranking: ItemsRankings = new ItemsRankings()
  public itemRating = ItemRatings;
  public dateFormat: string = CONST.DATE_FORMATTERS.DATE_FORMAT_SLASH_YEAR_TIME;
  public readonly CONST = CONST;

  public mockItemRatings = {
    comments: [
      {
        comment: "",
        rating: 1,
        rated_timestamp: "2023-08-02 10:55:11"
      }
    ],
    total_count: 1
  }

  constructor(
    private feedbackService: FeedbackServiceHandler,
    private dataStore: DataStore,
    private spinner: Spinner,
    private configLoader: ConfigLoader,
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.ranking = this.itemRanking.ranking;
    this.rankingPagination.page_limit = this.pageSize;
    // this.feedbackService.getRankingDetails(this.rankingPagination, this.itemRanking.ranking.item_id);
    this.observeRankings();
  }

  ngOnDestroy(): void {
    if (this.itemRankingSubscription) {
      this.itemRankingSubscription.unsubscribe();
    }
  }


  /**
   * observe rankings and comments
   * @private
   */
  private observeRankings() {
    this.spinner.show();
    this.itemRatings = this.mockItemRatings
    this.allComments = [...this.allComments, ...this.itemRatings.comments].slice();
    this.spinner.hide()
    // this.itemRankingSubscription = this.dataStore.get(DataKey.getSelectedRanking).subscribe((response: any) => {
    //   if (response && response.payload) {
    //     console.log(response.payload)
    //     this.itemRatings = response.payload;
    //     this.allComments = [...this.allComments, ...this.itemRatings.comments].slice();
    //     this.dataStore.get(DataKey.getSelectedRanking).next(null);
    //     this.itemRankingSubscription.unsubscribe();
    //     this.spinner.hide();
    //   }
    // });

  }

  /**
   * load more data on scroll
   */
  onScrollDown() {
    this.rankingPagination.offset += 1;
    const diffValue = this.itemRatings.total_count - (this.pageSize * this.rankingPagination.offset);
    if (diffValue > 0) {
      this.feedbackService.getRankingDetails(this.rankingPagination, this.itemRanking.ranking.item_id);
      this.observeRankings();
    }
  }

}
