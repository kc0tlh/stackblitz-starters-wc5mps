export class MerchantProfile {
  account: MerchantAccount;
  bank: MerchantBankingDetails;
  merchant:MerchantDetails;
}


export class MerchantAccount {
  id: number;
  userEmail: string;
}

export class MerchantBankingDetails {
  AccountNumber: string;
  Branch: string;
  Name: string;
}

export class MerchantDetails {
  address: string;
  auto_accept: boolean;
  capacity_types: null;
  currency_code: string;
  imagePath: string;
  merchantId: number;
  merchant_rating: string;
  name: string;
  no_of_ratings: string;
  openingHours: BusinessHours[];
  placePhone: string;
  userRating: number

}

export class BusinessHours {
  day: string;
}
