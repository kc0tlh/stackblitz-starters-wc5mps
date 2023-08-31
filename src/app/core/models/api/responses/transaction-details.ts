export class TransactionDetails {
  amount: number;
  currency_code: string;
  date: string
  description: string;
  formatted_amount: string
  job_id: number;
  transaction_type: string;
}

export class AccountingRules {
  rule_id: string;
  rule_desc: string;

  constructor() {
    this.rule_id = '';
    this.rule_desc = '';
  }
}
