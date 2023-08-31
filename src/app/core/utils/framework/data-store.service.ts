import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataStore {
  private data: Map<string, any> = new Map();
  private asyncData: Map<DataKey, BehaviorSubject<any>> = new Map();

  constructor() {
    for (const key in DataKey) {
      if (parseInt(key, 10) >= 0) {
        // create a new subject and store it there
        if (!this.asyncData.has(DataKey[DataKey[key]])) {
          this.asyncData.set(DataKey[DataKey[key]], new BehaviorSubject(null));
        }
      }
    }
  }

  public get(key: any, isAsync: boolean = true) {
    if (isAsync) {
      return this.asyncData.get(key);
    } else {
      return this.data.get(key);
    }
  }

  public set(key: any, data: any, isAsync: boolean = true) {
    if (isAsync) {
      if (!this.asyncData.has(key)) {
        this.asyncData.set(key, new BehaviorSubject(null));
      }
      this.asyncData.get(key)!.next(data);
    } else {
      this.data.set(key, data);
    }
  }

  public has(key: any, isAsync: boolean = true) {
    if (isAsync) {
      return this.asyncData.has(key);
    } else {
      return this.data.has(key);
    }
  }

  public clearAll(){
    this.data = new Map<string, any>();
    this.asyncData = new Map<DataKey, BehaviorSubject<any>>();

    for (const key in DataKey) {
      if (parseInt(key, 10) >= 0) {
        // create a new subject and store it there
        if (!this.asyncData.has(DataKey[DataKey[key]])) {
          this.asyncData.set(DataKey[DataKey[key]], new BehaviorSubject(null));
        }
      }
    }
  }

}

export enum DataKey {
  error,
  cancelPromotion,
  getPromoList,
  getPendingOrders,
  getOrderHistory,
  getPendingOrderDetails,
  getOrderHistoryDetails,
  getUserConfigs,
  getSKuItemList,
  getSkuItemDetails,
  getItemCategories,
  getTags,
  updateItemCategories,
  getSkuOptionById,
  saveSkuOption,
  merchantId,
  getCustomerFeedback,
  getFeedbackDiscount,
  createFeedbackDiscount,
  giveFeedbackDiscount,
  postMerchantReplyEmail,
  isRefresh,
  getOutletDetails,
  getDashboardProfileDetails,
  getDashboardOrderSummary,
  getDashboardAnalyticsSummary,
  getToken,
  getItemRankings,
  getItemComments,
  getSelectedComment,
  getFeedbackOverview,
  getSelectedRanking,
  getMerchantDetails,
  updateOutletInfo,
  updateSkusInOption,
  updateOptionsInSku,
  getContactInfo,
  getUserList,
  addUserDetails,
  updateUserDetails,
  getUser,
  userRole,
  userLogin,
  getSalesAnalytics,
}
