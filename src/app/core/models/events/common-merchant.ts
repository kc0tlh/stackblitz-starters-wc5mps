export class CommonMerchantEvent {
  merchant_id: number;
  merchant_name: string;
  event_name: string;
  service_group: string;

  constructor() {
    this.merchant_id = 0;
    this.merchant_name = '';
  }
}
