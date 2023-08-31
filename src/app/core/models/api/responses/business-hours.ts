export class BusinessHours {
  day: string;
  business_hours: BusinessHour[];
}

export class BusinessHour {
  constructor() {
    this.opening_hour = '';
    this.closing_hour = '';
  }
  opening_hour: string;
  closing_hour: string;
}
