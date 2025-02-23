import { Request, Response } from "express";
import { getReviews } from "@/services/getReviews.services";
import { TickRequest } from "@/lib/types";

export const tickController = async (req: Request, res: Response) => {
  // Accept request
  res.status(202).json({});
  try {
    const tickRequest: TickRequest = req.body;
    console.log(`placeID: ${tickRequest.settings[1]?.default}, interval: ${tickRequest.settings[0]?.default}`);

    const placeID = tickRequest.settings[1]?.default;

    if (placeID === "" || placeID === "(Enter Place ID)" || !placeID) {
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
      return;
    }
    // Fetch reviews
    const telexMessages = await getReviews(placeID);

    if (telexMessages.length === 0) {
      console.log("No new reviews to send.");
      return;
    }

    // Send messages to Telex with a delay
    for (const message of telexMessages) {
      try {
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
      } catch (error) {
        console.error("Error sending Telex message:", error);
      }

      // Add a 2-second delay before sending the next request
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  } catch (error) {
    console.error("Error during tick operation:", error);
    res
      .status(500)
      .json({ error: "Internal server error during tick operation" });
  }
};
