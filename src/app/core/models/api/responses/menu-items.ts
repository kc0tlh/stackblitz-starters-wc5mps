export class ItemsRankings {
  comments_count: number;
  dislike_count: number;
  image_url: string;
  item_id: number;
  item_name: string;
  like_count: number;
  ranking: number;
  rating_percentage: number;

  constructor() {
    this.comments_count = 0;
    this.dislike_count = 0;
    this.image_url = '';
    this.item_id = 0;
    this.item_name = '';
    this.like_count = 0;
    this.ranking = 0;
    this.rating_percentage = 0;
  }
}

export class ItemComment {
  comment: '';
  job_id: number;
  menu_item_id: number;
  menu_item_name: string;
  rated_timestamp: string;
  rating: number;


  constructor() {
    this.comment = '';
    this.job_id = 0;
    this.menu_item_id = 0;
    this.menu_item_name = '';
    this.rated_timestamp = '';
    this.rating = 0;
  }
}


export class FeedbackPagination {
  page_limit: number;
  offset: number;

  constructor() {
    this.page_limit = 10;
    this.offset = 0;
  }
}

export enum ItemRatings {
  NEGATIVE,
  POSITIVE

}
