import { OrderServiceType } from './order';


export class OrderDetails {
  customer_id: number;
  customer_name: string;
  customer_phone: number;
  rider_id: number;
  rider_name: string;
  rider_phone: string;
  job_data: JobData;
  status: OrderStatus;
  is_order_delivery: boolean;
  order_service_type: OrderServiceType;
  elapse_time: number;
  created_at: number;
  default_preptime: number;
  preptime_ext_status: number;
  order_count: OrderServiceType;
  is_preptime_extendable: boolean;
  overdue_time: number;
  capacity_type: number
}

export class JobData {
  delivery_note: string;
  fare_details: FareDetails;
  order_items: OrderItems[];
  is_custom: boolean;


}

export class FareDetails {
  delivery_fee: string;
  discount: string;
  order_amount: string;
  order_total: string;
  payable_to_restaurant: string;
  grand_total_display: string;
  markups: string;
  markups_list: Markup[];
  merchant_discount: string;
  price_amendment: string;
  merchant_grand_total: string;
  sub_total: string;
}

export class OrderItems {
  item_id: string;
  qty: string;
  name: string;
  sp_ins: string;
  row_total: string;
  item_total: string;
  price: string;
  order_options: OrderOptions[];
  image_urls: string;

}

export class OrderOptions {
  name: string;
  option_id: string;
  values: OrderValues[];
}

export class OrderValues {
  id: string;
  value: string;
  price: string;
  qty: number;
}

export enum OrderStatus {
  NEW = 1,
  PREPARING,
  PICKED,
  COMPLETED = 4,
  CANCELLED = 5,
  REJECTED = 6,
  READY = 7,
  PREP_TIME_EXTENDED = 13
}

export class Markup {
  description: string;
  display_name: string;
  merchant_showable: boolean;
  name: string;
  value: string;
}
