const {defineSecret} = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const {onRequest} = require("firebase-functions/https");

const googlePlacesApiKey = defineSecret("GOOGLE_PLACES_API_KEY");

exports.getPlacePhoto = onRequest(
    {
      cors: true,
      maxInstances: 10,
      secrets: [googlePlacesApiKey],
    },
    async (req, res) => {
      const {photoRef, maxWidth = "400"} = req.query;

      logger.info("Request received", {
        photoRefLength: photoRef ?
          photoRef.length : 0,
        photoRefStart: photoRef ?
          photoRef.substring(0, 50) : "none",
        photoRefEnd: photoRef ?
          photoRef.substring(photoRef.length - 50) : "none",
      });

      if (!photoRef) {
        logger.warn("Missing photoRef parameter");
        res.status(400).send("Missing photoRef parameter");
        return;
      }

      const width = Math.min(
          Math.max(parseInt(maxWidth, 10) || 400, 1),
          4800,
      );

      const apiKey = googlePlacesApiKey.value();
      const url = `https://places.googleapis.com/v1/${photoRef}/media` +
          `?maxWidthPx=${width}&skipHttpRedirect=true&key=${apiKey}`;

      try {
        const response = await fetch(url, {
          headers: {
            "Accept": "image/*",
          },
        });

        if (!response.ok) {
          const errorBody = await response.text();
          logger.error("Google Places API error", {
            status: response.status,
            photoRef,
            errorBody,
          });
          res.status(response.status).send("Failed to fetch photo");
          return;
        }

        const data = await response.json();

        if (data.photoUri) {
          const photoUrl = new URL(data.photoUri);
          if (!photoUrl.hostname.endsWith(".googleusercontent.com")) {
            logger.error("Unexpected photo URI domain", {
              photoUri: data.photoUri,
            });
            res.status(500).send("Invalid photo source");
            return;
          }
          res.redirect(data.photoUri);
          return;
        }

        res.status(400).send("No photo URI found");
      } catch (error) {
        logger.error("Error fetching photo", {
          error: error.message,
          photoRef,
        });
        res.status(500).send("Internal server error");
      }
    },
);
