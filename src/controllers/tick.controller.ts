import { Request, Response } from "express";
import { getReviews } from "@/services/getReviews.services";
import { TickRequest } from "@/lib/types";

export const tickController = async (req: Request, res: Response) => {
  const tickRequest: TickRequest = req.body;

  try {
    // Accept request
    res.status(202).json({});

    // Fetch reviews
    const placeReviews = await getReviews(tickRequest.settings[0].default);

    // Notify Telex
    try {
      const telexResponse = await fetch(tickRequest.return_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: placeReviews,
          username: "Google Reviews",
          event_name: "Get latest reviews",
          status: "success",
        }),
      });

      if (!telexResponse.ok) {
        console.error("Telex notification failed:", await telexResponse.text());
      } else {
        console.log("Telex notification sent successfully");
      }
    } catch (telexError) {
      console.error("Error during Telex notification:", telexError);
    }
  } catch (error) {
    console.error("Error during tick operation:", error);
    res
      .status(500)
      .json({ error: "Internal server error during tick operation" });
  }
};
