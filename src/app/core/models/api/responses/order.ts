import { JobDetails } from './job-details';

export class Order {
  order_counter: number;
  prep_time: number;
  new_order_list: [];
  confirmed_order_list: [];
  ready_pickup_order_list: JobDetails[];
  updated_at: number;
  prep_progress: string;
  customer_phone: string;
  order_count: OrderServiceType;
  overdue_time: number;
  is_viewed: boolean;


  constructor() {
    this.order_counter = 0;
    this.prep_time = 0;
    this.new_order_list = [];
    this.confirmed_order_list = [];
    this.ready_pickup_order_list = [];
    this.updated_at = 0;
    this.prep_progress = '';
    this.customer_phone = '';
    this.order_count = new OrderServiceType();
    this.overdue_time = 0;
    this.is_viewed = false;
  }
}

export class OrderServiceType {
  code: number;
  label: string;


  constructor() {
    this.code = 0;
    this.label = '';
  }
}
