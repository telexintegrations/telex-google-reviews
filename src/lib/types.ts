export type TickRequest = {
  channel_id: "string";
  return_url: "string";
  settings: [
    {
      label: "interval";
      type: "text";
      required: true;
      default: string;
    },
    {
      label: "Business Place ID";
      type: "text";
      required: true;
      default: string;
    }
  ];
};

export interface Place {
  html_attributions: any[];
  result: Result;
  status: string;
}

export interface Result {
  name: string;
  rating: number;
  reviews: Review[];
  user_ratings_total: number;
}

export interface Review {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number; // Time since midnight, January 1, 1970 UTC.
  translated: boolean;
}
