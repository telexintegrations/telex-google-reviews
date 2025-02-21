import { Place } from "@/lib/types";

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://gusc1-sought-hookworm-31014.upstash.io",
  token: process.env["REDIS_TOKEN"],
});

export const getReviews = async (placeID: string) => {
  //fetch reviews from google
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&fields=name,reviews&language=en&reviews_sort=newest&key=${process.env["GOOGLE_PLACES_API_KEY"]}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { result } = (await response.json()) as Place;

  //fetch lastUpdated time from upstash
  const lastUpdated = Number(await redis.get(`${placeID}`)) || 0;

  //get new reviews
  const reviews = result.reviews;
  const newReviews = reviews.filter((review) => review.time > lastUpdated);

  if (!newReviews.length) {
    return [];
  }

  const getStars = (rating: number): string => {
    return "⭐".repeat(Math.min(Math.max(Math.round(rating), 1), 5));
  };

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  //return an array of telex messages for each review
  let messages: {
    event_name: string;
    message: string;
    status: string;
    username: string;
  }[] = [];

  newReviews.forEach((review) => {
    const { author_name, rating, text, time } = review;

    messages.push({
      event_name: `Rating for ${result.name}`,
      message: [
        `Name: ${author_name}`,
        `Rating: ${getStars(rating)} (${rating})`,
        `Message: ${text}`,
        `Date: ${formatTimestamp(time)}`,
      ].join("\n"),
      status: "success",
      username: "Google Reviews Bot",
    });
  });

  await redis.set(placeID, newReviews[0]?.time);

  //reverse messages and return
  const sortedMessages = messages.reverse();

  return sortedMessages;
};
