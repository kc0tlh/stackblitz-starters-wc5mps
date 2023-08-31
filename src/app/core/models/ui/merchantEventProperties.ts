import { SkuInOption } from '../api/payloads/skus-in-option-update-payload';

export class ApiEventDetails{
  event_name: string;
  event_data: CommonAPIEventProperties;
  constructor() {
    this.event_name = '';
    this.event_data = new CommonAPIEventProperties();
  }
}
export class MerchantEventProperties {
  merchant_id: number;
  merchant_name: string;
  constructor() {
    this.merchant_id = 0;
    this.merchant_name = '';
  }
}

export class CommonAPIEventProperties extends MerchantEventProperties {
  item_id?: any;
  item_name?: string;
  item_status?: string;
  path?: string;
  thumbnail_image_cdn?: string;
  banner_image_cdn?: string;
  category?: number;
  option?: SkuInOption[];
  individuallySellable?: boolean;
  price?: number;
  previous_price?: number;
  update_price?: number;
  spend_amount?: number;
  discount_amount?: number;
  usage?: string;
  starting_datetime?: string;
  ending_datetime?: string;
  budget?: number;
  redemption_count?: number;
  passenger_id?: number;
  passenger_feedback?: string;
  order_id?: number;
}
