import { Request, Response } from "express";
import { getReviews } from "@/services/getReviews.services";
import { TickRequest } from "@/lib/types";

export const tickController = async (req: Request, res: Response) => {
  const tickRequest: TickRequest = req.body;
  try {
    // Accept request
    res.status(202).json({});

    const placeID = tickRequest.settings[1].default;

    // Fetch messages
    const telexMessages = await getReviews(placeID);

    try {
      telexMessages.forEach(async (message) => {
        const telexResponse = await fetch(tickRequest.return_url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(message),
        });
        if (!telexResponse.ok) {
          console.error(
            "Telex notification failed:",
            await telexResponse.text()
          );
        } else {
          console.log("Telex notification sent successfully");
        }
      });
    } catch (error) {
      console.error("Error during telex messaging:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error during tick operation:", error);
    res
      .status(500)
      .json({ error: "Internal server error during tick operation" });
  }
};
