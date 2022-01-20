import { imageLoader } from "remix-image";

export const loader = imageLoader({
  selfUrl: "http://localhost:3000",
  whitelistedDomains: ["i.imgur.com"],
});
