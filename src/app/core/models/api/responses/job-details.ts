import { OrderServiceType } from './order';

export class JobDetails {
  job_id: number;
  num_item: number;
  status: number;
  created_at: number;
  order_total: string;
  is_order_delivery: boolean;
  order_service_type: OrderServiceType;


  constructor() {
    this.job_id = 0;
    this.num_item = 0;
    this.status = 0;
    this.created_at = 0;
    this.order_total = '';
    this.is_order_delivery = false;
    this.order_service_type = new OrderServiceType();
  }
}
