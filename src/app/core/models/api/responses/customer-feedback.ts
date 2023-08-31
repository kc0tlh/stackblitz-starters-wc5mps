import { OrderOptions } from './order-details';

export class CustomerFeedback {
  days_to_reply: DaysToReply;
  disliked_menuitem_count: number;
  job_completed_timestamp: string;
  job_created_timestamp: string;
  job_id: number;
  feedback_promotion: string;
  job_rated_timestamp: string;
  liked_menuitem_count: number;
  merchant_discount: string;
  merchant_rating: MerchantRatings;
  merchant_replied_timestamp: string;
  merchant_reply: string;
  order_details: FeedbackOrderDetails[];
  passenger_comment: string;
  passenger_firstname: string;
  passenger_order_count: PassengerOrderCount;
  rating_tags: string[];
  passenger_id: number;
  subtotal_order_amount: string;
  total_order_amount: string;

}

export class FeedbackOrderDetails {
  comment: string;
  item_id: number;
  item_total: string;
  name: string;
  order_options: OrderOptions[];
  qty: number;
  rating: number;
  row_total: string;
  sp_ins: string;
}

export class FeedbackDiscount {
  promotion_id: number;
  promotion_code: string;
  promotion_name: string;
  promotion_discount_amount: number;
  currency_code: string;
  start_date: string;
  end_data: string;
  is_passenger_selected: boolean;
}

export enum MerchantRatings {
  NEGATIVE,
  POSITIVE
}

export enum PassengerOrderCount {
  NEW_CUSTOMER = 1,
}

export enum DaysToReply {
  CANNOT_REPLY = -2,
  ALREADY_REPLIED = -1
}
