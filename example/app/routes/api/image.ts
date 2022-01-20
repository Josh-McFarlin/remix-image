import { imageLoader } from "remix-image/loaders";

export const loader = imageLoader({
  selfUrl: "http://localhost:3000",
  whitelistedDomains: ["i.imgur.com"],
});
