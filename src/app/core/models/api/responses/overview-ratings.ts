export class OverviewRatings {
  grading_image: string;
  grading_name: string;
  grading_sub_heading: string;
  grading_text: string;
  negative_rating_percentage: number;
  positive_rating_percentage: number;
  tag_ratings: TagRating[];
  total_ratings: number;
}

export class TagRating {
  rating_percentage: number;
  tag_name: string;
  tag_sign: string;
}

export class ItemRating {
  total_count: number;
  comments: MenuItemComment[];
}

export class MenuItemComment {
  comment: string;
  rated_timestamp: string;
  rating: number;
}
