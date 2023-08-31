export class CustomerFeedbackPagination {
  page_limit: number;
  offset: number;

  constructor() {
    this.page_limit = 0;
    this.offset = 0;
  }
}

export class CustomerReply {
  job_id: number;
  merchant_id: number;
  customer_feedback: string;
  reply_text: string;
  discount: Discount | null;
}

export class Discount {
  outlet_name: string;
  amount: number;
  expiry_date: string;
  currency_code: string;
}

export class SelectedPassengers {
  passenger_id: number;
  order_id: number;

  constructor() {
    this.passenger_id = 0;
    this.order_id = 0;
  }
}
