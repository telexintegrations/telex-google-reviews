import { Request, Response } from "express";
import { getReviews } from "@/services/getReviews.services";
import { TickRequest } from "@/lib/types";

export const tickController = async (req: Request, res: Response) => {
  // Accept request
  res.status(202);
  try {
    const tickRequest: TickRequest = req.body;

    const placeID = tickRequest.settings[1]?.default;

    if (!placeID) {
      console.error("Missing Place ID in settings.");

      // Send an error response to the return_url
      await fetch(tickRequest.return_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: `No Place ID`,
          message:
            "Please input your business place ID in the integration settings",
          status: "error",
          username: "Google Reviews Bot",
        }),
      });
    }
    // Fetch reviews
    const telexMessages = await getReviews(placeID);

    if (telexMessages.length === 0) {
      console.log("No new reviews to send.");
      return;
    }

    // Send messages to Telex
    const responses = await Promise.allSettled(
      telexMessages.map(async (message) => {
        const telexResponse = await fetch(tickRequest.return_url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(message),
        });

        if (!telexResponse.ok) {
          const errorText = await telexResponse.text();
          console.error("Telex notification failed:", errorText);
          throw new Error(`Telex error: ${errorText}`);
        } else {
          console.log("Telex notification sent successfully.");
        }
      })
    );

    // Log any rejected requests
    responses.forEach((result) => {
      if (result.status === "rejected") {
        console.error("Error sending Telex message:", result.reason);
      }
    });
  } catch (error) {
    console.error("Error during tick operation:", error);
    res
      .status(500)
      .json({ error: "Internal server error during tick operation" });
  }
};
