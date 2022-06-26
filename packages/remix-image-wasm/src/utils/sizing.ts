import {
  ImageFit,
  ImagePosition,
  ImagePositionHorizontal,
  ImagePositionVertical,
} from "remix-image";

const positionSplitter: Record<
  ImagePosition,
  {
    horizontalPosition: ImagePositionHorizontal;
    verticalPosition: ImagePositionVertical;
  }
> = {
  "center bottom": {
    horizontalPosition: "center",
    verticalPosition: "bottom",
  },
  "center center": {
    horizontalPosition: "center",
    verticalPosition: "center",
  },
  "center top": { horizontalPosition: "center", verticalPosition: "top" },
  "left bottom": { horizontalPosition: "left", verticalPosition: "bottom" },
  "left center": { horizontalPosition: "left", verticalPosition: "center" },
  "left top": { horizontalPosition: "left", verticalPosition: "top" },
  "right bottom": {
    horizontalPosition: "right",
    verticalPosition: "bottom",
  },
  "right center": {
    horizontalPosition: "right",
    verticalPosition: "center",
  },
  "right top": { horizontalPosition: "right", verticalPosition: "top" },
  bottom: { horizontalPosition: "center", verticalPosition: "bottom" },
  center: {
    horizontalPosition: "center",
    verticalPosition: "center",
  },
  left: { horizontalPosition: "left", verticalPosition: "center" },
  right: { horizontalPosition: "right", verticalPosition: "center" },
  top: { horizontalPosition: "center", verticalPosition: "top" },
};

export const getPositions = (
  position: ImagePosition
): {
  horizontalPosition: ImagePositionHorizontal;
  verticalPosition: ImagePositionVertical;
} => {
  return positionSplitter[position] || positionSplitter.center;
};

export const getFrameDimensions = (
  srcWidth: number,
  srcHeight: number,
  maxWidth: number | null,
  maxHeight: number | null,
  fit: ImageFit
): {
  frameWidth: number;
  frameHeight: number;
} => {
  if (maxWidth && maxHeight) {
    if (fit === "fill" || fit === "contain") {
      /** Fill: Ignore the aspect ratio of the input and stretch to both provided dimensions. */
      /** Contain: Preserving aspect ratio, contain image within both provided dimensions using a border where necessary. */
      return {
        frameWidth: maxWidth,
        frameHeight: maxHeight,
      };
    } else if (fit === "inside") {
      /** Inside: Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified. */
      const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

      return {
        frameWidth: Math.round(srcWidth * ratio),
        frameHeight: Math.round(srcHeight * ratio),
      };
    } else if (fit === "outside") {
      /** Outside: Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified. */
      const ratio = Math.max(maxWidth / srcWidth, maxHeight / srcHeight);

      return {
        frameWidth: Math.round(srcWidth * ratio),
        frameHeight: Math.round(srcHeight * ratio),
      };
    }
  }

  // Fallback to cover
  /** Cover: Preserving aspect ratio, ensure the image covers both provided dimensions by cropping it to fit. */
  const aspectRatio = srcWidth / srcHeight;

  return {
    frameWidth: maxWidth || Math.round(maxHeight! * aspectRatio),
    frameHeight: maxHeight || Math.round(maxWidth! / aspectRatio),
  };
};

export const getImageDimensions = (
  srcWidth: number,
  srcHeight: number,
  frameWidth: number,
  frameHeight: number,
  fit: ImageFit,
  position: ImagePosition
): {
  imageWidth: number;
  imageHeight: number;
  xOffset: number;
  yOffset: number;
} => {
  const aspectRatio = srcWidth / srcHeight;
  const frameAspectRatio = frameWidth / frameHeight;

  let imageWidth = frameWidth;
  let imageHeight = frameHeight;
  let xOffset = 0;
  let yOffset = 0;

  if (fit === "contain" || fit === "cover") {
    if (fit === "contain") {
      /** Contain: Preserving aspect ratio, contain image within both provided dimensions using a border where necessary. */
      if (aspectRatio >= frameAspectRatio) {
        // image wider than frame
        // so image will fill width, height calculated from width
        imageHeight = frameWidth / aspectRatio;
      } else {
        // image taller than frame
        // so image will fill height, width calculated from height
        imageWidth = frameHeight * aspectRatio;
      }
    } else if (fit === "cover") {
      /** Cover: Preserving aspect ratio, ensure the image covers both provided dimensions by cropping it to fit. */
      if (aspectRatio < frameAspectRatio) {
        // image width smaller than frame
        // so image will fill width, height calculated from width
        imageWidth = frameWidth;
        imageHeight = frameWidth / aspectRatio;
      } else {
        // image width greater than frame
        // so image will fill height, width calculated from height
        imageWidth = frameHeight * aspectRatio;
        imageHeight = frameHeight;
      }
    }

    const { horizontalPosition, verticalPosition } = getPositions(position);

    if (horizontalPosition === "left") {
      xOffset = 0;
    } else if (horizontalPosition === "center") {
      xOffset = frameWidth / 2 - imageWidth / 2;
    } else if (horizontalPosition === "right") {
      xOffset = frameWidth - imageWidth;
    }

    if (verticalPosition === "top") {
      yOffset = 0;
    } else if (verticalPosition === "center") {
      yOffset = frameHeight / 2 - imageHeight / 2;
    } else if (verticalPosition === "bottom") {
      yOffset = frameHeight - imageHeight;
    }
  }

  return {
    imageWidth: Math.round(imageWidth),
    imageHeight: Math.round(imageHeight),
    xOffset: Math.round(xOffset),
    yOffset: Math.round(yOffset),
  };
};
