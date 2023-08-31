import { Injectable } from '@angular/core';
import { DataKey, DataStore } from '../framework/data-store.service';
import clevertap from 'clevertap-web-sdk';
import { Subscription } from 'rxjs';
import { CommonMerchantEvent } from '../../models/events/common-merchant';
import { ConfigLoader } from '../framework/config-loader.service';
import { CONST } from '../constant';

@Injectable()
export class CleverTapService {
  private merchantEventProperties = new CommonMerchantEvent();
  private merchantData: any;
  private merchantSubscription = new Subscription();

   constructor(private dataStore: DataStore,
               private configLoader: ConfigLoader) {

  }

  public init() {
    const environment = localStorage.getItem('yhyj');
    const cleverTapEnvironmentConfigs = this.configLoader.configurations.get(CONST.APP_CONFIG.ENVIRONMENT_CONFIG);
    const cleverTapSystemConfigs = this.configLoader.configurations.get(CONST.APP_CONFIG.SYSTEM_CONFIG);
    let CLEVERTAP_ACC_ID;

    switch (environment) {
      case 'DEV':
        CLEVERTAP_ACC_ID = cleverTapEnvironmentConfigs?.cLever_tap.DEV;
        break;
      case 'STAGE':
        CLEVERTAP_ACC_ID = cleverTapEnvironmentConfigs?.cLever_tap.STAGE;
        break;
      case 'PROD':
        CLEVERTAP_ACC_ID = cleverTapEnvironmentConfigs?.cLever_tap.PROD;
        break;
      default :
        CLEVERTAP_ACC_ID = cleverTapEnvironmentConfigs?.cLever_tap.LOCAL;
    }
    const isEnableCleverTap = cleverTapSystemConfigs?.commons.cleverTap;
    if (isEnableCleverTap) {
      clevertap.privacy.push({optOut: false});
      clevertap.privacy.push({useIP: false});
      clevertap.spa = true;
      clevertap.init(CLEVERTAP_ACC_ID);
      this.getUserConfigDetails();
    }
  }
  /**
   * for subscribe merchant details data key and set clevertap event properties to the object
   */
  public getUserConfigDetails() {
    this.merchantSubscription = this.dataStore.get(DataKey.getMerchantDetails, true).subscribe((res: any) => {
      if (res && res.data) {
        this.merchantEventProperties.merchant_id = res.data.merchant.merchantId;
        this.merchantEventProperties.merchant_name = res.data.merchant.name;
        this.merchantData = res.data;
        this.merchantSubscription.unsubscribe();
        this.setProfile();
      }
    });
  }

  /**
   * set the current login user details to profile object
   */
  public setProfile() {
    clevertap.onUserLogin.push({
      'Site': {
        'Name': this.merchantData.merchant.name,
        'Identity': this.merchantData.account.id,
        'Email': this.merchantData.account.userEmail,
        'MerchantId': this.merchantData.merchant.merchantId,
        'Service Group' : this.getServiceGroup()
      }
    });
  }

  /**
   * get user service group
   */
  private getServiceGroup(): string {
    if (this.merchantData.merchant.service_group_code === 'adf') {
      this.merchantEventProperties.service_group = 'affadf';
      return 'Food';
    } else {
      this.merchantEventProperties.service_group = 'fadfadf';
      return 'Market';
    }
  }
  /**
   * get the merchant id and name for the event fire
   */
  public getEventProperty() {
    return this.merchantEventProperties;
  }

  /**
   * for subscribe data key and fire the events
   */
  public onFireApiEvents( eventData: any) {
    const isEnableCleverTap = this.configLoader.configurations.get(CONST.APP_CONFIG.SYSTEM_CONFIG)?.commons.cleverTap;
    if (isEnableCleverTap) {
      const {event_name, ...finalEventData} = eventData;
      finalEventData.merchant_id = this.merchantEventProperties.merchant_id;
      finalEventData.merchant_name = this.merchantEventProperties.merchant_name;
      finalEventData.service_group = this.merchantEventProperties.service_group;
      clevertap.event.push(eventData.event_name, finalEventData);
    }

  }


}
