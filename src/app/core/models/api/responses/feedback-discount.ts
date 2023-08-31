export class FeedbackDiscount {
  promotion_id: number;
  promotion_code: number;
  promotion_name: string;
  promotion_discount_amount: number;
  currency_code: string;
  start_date: string;
  end_data: string;
  is_passenger_selected: boolean;
}

export class NewFeedbackDiscount {
  name: string = '';
  discount_amount: number = 0;
}
