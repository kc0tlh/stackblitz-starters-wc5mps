import { Injectable } from '@angular/core';
import { DataLoaderService } from '../data-loader.service';
import { DataKey, DataStore } from '../../utils/framework/data-store.service';
import { QueryParamsService } from '../../utils/framework/query-params.service';
import { CONST } from '../../utils/constant';
import {
  CustomerFeedbackPagination,
  CustomerReply,
  SelectedPassengers
} from '../../models/api/payloads/customer-feedback-payloads';
import { HttpParams } from '@angular/common/http';
import { NewFeedbackDiscount, } from '../../models/api/responses/feedback-discount';
import { FeedbackPagination } from '../../models/api/responses/menu-items';
import { AwardFeedbackDiscountEvent } from '../../models/events/award-feedback-discount';


@Injectable()
export class FeedbackServiceHandler {
  constructor(
    private dataLoader: DataLoaderService,
    private dataStore: DataStore,
    private queryParamsService: QueryParamsService,
  ) {
  }

  /**
   * API call  for getting all the feedback details
   * @param pagination
   */
  public getFeedbackDetails(pagination: CustomerFeedbackPagination) {
    const params: HttpParams = this.queryParamsService.getHttpParams(pagination);
    this.dataLoader.getAndLoadResponse(DataKey.getCustomerFeedback, CONST.ENDPOINTS.GET_CUSTOMER_FEEDBACK, params);
    return this.dataStore.get(DataKey.getCustomerFeedback, true);
  }

  /**
   * get existing feedback discount related to the selected passenger
   * @param passenger_Id
   */
  public getFeedbackDiscount(passenger_Id: number) {
    const passenger_id = {
      'passenger_id': passenger_Id
    };
    const params: HttpParams = this.queryParamsService.getHttpParams(passenger_id);
    this.dataLoader.getAndLoadResponse(DataKey.getFeedbackDiscount, CONST.ENDPOINTS.GET_FEEDBACK_DISCOUNT, params);
    return this.dataStore.get(DataKey.getFeedbackDiscount, true);
  }

  /**
   * create new feedback discount
   * @param passengerID
   * @param eventData
   */
  public createFeedbackDiscount(passengerID: NewFeedbackDiscount, eventData: AwardFeedbackDiscountEvent) {
    const params: HttpParams = this.queryParamsService.getHttpParams(passengerID);
    this.dataLoader.postAndLoadResponse(DataKey.createFeedbackDiscount, CONST.ENDPOINTS.CREATE_FEEDBACK_DISCOUNT, passengerID, undefined, undefined, eventData);
    return this.dataStore.get(DataKey.createFeedbackDiscount, true);
  }

  /**
   * give a feedback discount to a selected passenger
   * @param passengers
   * @param promotionID
   * @param eventData
   */
  public giveDiscount(passengers: SelectedPassengers[], promotionID: number, eventData: AwardFeedbackDiscountEvent) {
    this.dataLoader.putAndLoadResponse(DataKey.giveFeedbackDiscount, CONST.ENDPOINTS.GIVE_FEEDBACK_DISCOUNT, passengers, undefined, [promotionID], eventData);
    return this.dataStore.get(DataKey.giveFeedbackDiscount, true);
  }

  /**
   * API call for replying to a passenger
   * @param reply
   */
  public sendReplyEmail(reply: CustomerReply) {
    this.dataLoader.postAndLoadResponse(DataKey.postMerchantReplyEmail, CONST.ENDPOINTS.POST_MERCHANT_REPLY, reply);
    return this.dataStore.get(DataKey.postMerchantReplyEmail, true);
  }

  /**
   * get feedback overview
   */
  public getFeedbackOverview() {
    this.dataLoader.getAndLoadResponse(DataKey.getFeedbackOverview, CONST.ENDPOINTS.GET_FEEDBACK_OVERVIEW,);
    return this.dataStore.get(DataKey.getFeedbackOverview, true);
  }

  /**
   * get the list of item rankings
   * @param pagination
   */
  public getItemRankings(pagination: FeedbackPagination) {
    const params: HttpParams = this.queryParamsService.getHttpParams(pagination);
    this.dataLoader.getAndLoadResponse(DataKey.getItemRankings, CONST.ENDPOINTS.GET_ITEM_RANKINGS, params);
    return this.dataStore.get(DataKey.getItemRankings, true);
  }

  /**
   * get the list of comments
   * @param pagination
   */
  public getItemComments(pagination: FeedbackPagination) {
    const params: HttpParams = this.queryParamsService.getHttpParams(pagination);
    this.dataLoader.getAndLoadResponse(DataKey.getItemComments, CONST.ENDPOINTS.GET_ITEM_COMMENTS, params);
    return this.dataStore.get(DataKey.getItemComments, true);
  }

  /**
   * get details for a specific comment
   * @param orderId
   */
  public getCommentDetails(orderId: number) {
    this.dataLoader.getAndLoadResponse(DataKey.getSelectedComment, CONST.ENDPOINTS.GET_SELECTED_COMMENT, undefined, [orderId]);
    return this.dataStore.get(DataKey.getSelectedComment, true);
  }

  /**
   * get details for a specific ranking
   * @param pagination
   * @param orderId
   */
  public getRankingDetails(pagination: FeedbackPagination, orderId: number) {
    const params: HttpParams = this.queryParamsService.getHttpParams(pagination);
    this.dataLoader.getAndLoadResponse(DataKey.getSelectedRanking, CONST.ENDPOINTS.GET_SELECTED_RANKING, params, [orderId]);
    return this.dataStore.get(DataKey.getSelectedRanking, true);
  }

}
