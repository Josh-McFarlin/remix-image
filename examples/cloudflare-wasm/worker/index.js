import { createEventHandler } from "@remix-run/cloudflare-workers";

import * as build from "../build";

// Simple Polyfill ImageData Object
globalThis.ImageData = class ImageData {
  constructor(data, width, height) {
    this.data = data;
    this.width = width;
    this.height = height;
  }
};

addEventListener("fetch", createEventHandler({ build }));
