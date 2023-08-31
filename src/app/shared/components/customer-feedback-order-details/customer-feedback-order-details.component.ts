import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DateFormatter } from '../../../core/utils/helpers/date-formatter.service';
import {
  CustomerFeedback,
  MerchantRatings,
  PassengerOrderCount
} from '../../../core/models/api/responses/customer-feedback';
import { CommonHelper } from '../../../core/utils/helpers/common-helper.service';
import { Subscription } from 'rxjs';
import { FeedbackServiceHandler } from '../../../core/services/service-handlers/feedback-service-handler';
import { DataKey, DataStore } from '../../../core/utils/framework/data-store.service';
import { ConfigLoader } from '../../../core/utils/framework/config-loader.service';
import { FeedbackDiscount, NewFeedbackDiscount, } from '../../../core/models/api/responses/feedback-discount';
import {
  SelectedPassengers
} from '../../../core/models/api/payloads/customer-feedback-payloads';
import { Spinner } from '../../../core/utils/ui/spinner.service';
import { ALERT_TYPE, Snackbar } from '../../../core/utils/ui/snackbar.service';
import { CONST } from '../../../core/utils/constant';
import { MerchantProfile } from '../../../core/models/api/responses/merchant-profile';
import { AwardFeedbackDiscountEvent } from '../../../core/models/events/award-feedback-discount';
import { ModalService } from '../../../core/utils/ui/modal.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'mp-customer-feedback-order-details',
  templateUrl: './customer-feedback-order-details.component.html',
  styleUrls: ['./customer-feedback-order-details.component.scss']
})
export class CustomerFeedbackOrderDetailsComponent implements OnInit, OnDestroy {

  @Input() orderInfo: any;

  private feedbackDiscountSubscription: Subscription;
  private passengers = new SelectedPassengers();
  private merchantDetails: MerchantProfile = new MerchantProfile();

  public feedbackDiscount: FeedbackDiscount[] = [];
  public feedback: CustomerFeedback;
  public merchantRating = MerchantRatings;
  public orderCount = PassengerOrderCount;
  public isFeedbackDetails: boolean = true;
  public isDiscountGiven: boolean = false
  public merchantReply: string = '';
  public isPromotionSelected: boolean = false;
  public isDiscountSelected: boolean = false;
  public isDataLoaded: boolean = false;
  public isLoading: boolean = false;
  public dateFormat: string = CONST.DATE_FORMATTERS.DATE_FORMAT_SLASH_YEAR_TIME;
  private discountData: NewFeedbackDiscount;
  private event: AwardFeedbackDiscountEvent;
  public promotionName: string = '';
  private isOngoingDiscount = false;
  public readonly CONST = CONST;

  constructor(public dateFormatter: DateFormatter,
              private spinner: Spinner,
              public helper: CommonHelper,
              private configLoader: ConfigLoader,
              private feedbackDiscountModal: MatDialog,
              private dataStore: DataStore,
              private feedbackServiceHandler: FeedbackServiceHandler,
              private snackBar: Snackbar,
              public modalService: ModalService,
  ) { }

  ngOnInit(): void {
    document.body.classList.add('body-overflow-hidden');
    this.feedback = this.orderInfo.feedbackDetails;
    this.isFeedbackDetails = this.orderInfo.showFeedbackDetails;
    this.merchantDetails = this.orderInfo.merchantDetails;
  }

  ngOnDestroy(): void {
    document.body.classList.remove('body-overflow-hidden');
    if (this.feedbackDiscountSubscription) {
      this.feedbackDiscountSubscription.unsubscribe();
    }
    this.isDiscountSelected = false;
  }

  /**
   * check for applied feedbacks for the selected user
   * @param feedbackDetails
   */
  checkForDiscounts(feedbackDetails: FeedbackDiscount[]) {
    feedbackDetails.forEach((res: FeedbackDiscount) => {
      if (res.is_passenger_selected) {
        this.isDiscountGiven = true;
        return;
      }
    });
  }


  /**
   * API request for discount
   * @private
   */
  public giveDiscountToPassenger() {
    const eventData: AwardFeedbackDiscountEvent = new AwardFeedbackDiscountEvent();

    this.passengers.passenger_id = this.feedback.passenger_id;
    this.passengers.order_id = this.feedback.job_id;
    const selectedPassengerList: SelectedPassengers[] = [];
    selectedPassengerList.push(this.passengers);

    eventData.passenger_id = this.feedback.passenger_id;
    eventData.order_id = this.feedback.job_id;
    eventData.discount_amount = this.feedbackDiscount[0].promotion_discount_amount;

    this.feedbackServiceHandler.giveDiscount(selectedPassengerList, this.feedbackDiscount[0].promotion_id, eventData);
    this.feedbackDiscountSubscription = this.dataStore.get(DataKey.giveFeedbackDiscount).subscribe((response: any) => {
      if (response && response.data) {
        this.isOngoingDiscount = false;
        this.feedbackDiscountSubscription.unsubscribe();
        this.dataStore.get(DataKey.giveFeedbackDiscount).next(null);
        this.snackBarBuilder('Discount offered successfully.', ALERT_TYPE.SUCCESS, 'Discount Offered');
      }
    });
  }

  /**
   * deselect  the discount
   */
  public onRemoveDiscount() {
    this.passengers = new SelectedPassengers();
    this.isDiscountSelected = false;
  }

  /**
   * success messages
   * @param message
   * @param alertType
   * @param title
   * @private
   */
  private snackBarBuilder(message: string, alertType: ALERT_TYPE, title: string) {
    this.snackBar.show(alertType, title, message, 3000);
  }


  public adjustHeight(el: any) {
    if (el.target.scrollHeight > el.target.clientHeight) {
      el.target.style.height = (el.target.scrollHeight) + 'px';
      el.target.parentElement.style.height = (el.target.scrollHeight) + 'px';
    }
  }
}
