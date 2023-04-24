import { Router } from "express";
import fetch from "node-fetch";
const router = Router();

router.get("/", function (req, res) {
  const { query, nextPageToken } = req.query;
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&type=restaurant&key=${process.env.GOOGLE_API_KEY}&language=th`;
  if (nextPageToken) {
    url += `&pagetoken=${nextPageToken}`;
  }
  try {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === "OK") {
          const { next_page_token, results } = data;
          res.json({
            next_page_token,
            results: results.map((e) => {
              let storeLink = null;
              try {
                const linkRegex = /href="([^"]*)"/;
                const linkMatch =
                  e.photos[0].html_attributions[0].match(linkRegex);
                if (linkMatch) {
                  storeLink = linkMatch[1];
                }
              } catch (error) {}
              return {
                name: e.name,
                link: storeLink
                  ? storeLink
                  : e.geometry && e.geometry.location
                  ? `https://www.google.com/maps/search/?api=1&query=${e.geometry.location.lat},${e.geometry.location.lng}`
                  : undefined,
                image:
                  e.photos && e.photos.length > 0
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${e.photos[0].photo_reference}&key=${process.env.GOOGLE_API_KEY}`
                    : undefined,
                formatted_address: e.formatted_address,
              };
            }),
          });
        } else {
          return res.status(500).send(data?.status);
        }
      })
      .catch((e) => {
        return res.status(500).send(e.message);
      });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;
