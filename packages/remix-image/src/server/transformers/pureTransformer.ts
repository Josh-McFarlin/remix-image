import ImageTransformer, {
  supportedInputs,
  supportedOutputs,
} from "js-image-lib";
import { MimeType } from "../../types/file";
import { ImagePosition, Transformer } from "../../types/transformer";

export const pureTransformer: Transformer = {
  name: "pureTransformer",
  supportedInputs,
  supportedOutputs,
  fallbackOutput: MimeType.PNG,
  transform: async (
    { data, contentType: inputContentType },
    {
      contentType: outputContentType,
      width,
      height,
      fit,
      position,
      background,
      quality,
      loop,
      delay,
      blurRadius,
      rotate,
      flip,
      crop,
      compressionLevel,
    }
  ) => {
    const image = new ImageTransformer(data, inputContentType, {
      background,
      loop,
      delay,
      quality,
      compressionLevel,
    });

    if (crop) {
      image.crop(crop.x, crop.y, crop.width, crop.height);
    }

    if (width != null || height != null) {
      // @ts-ignore at least one is a number
      image.resize(width, height, {
        fit,
        position: position as ImagePosition,
      });
    }

    if (flip) {
      image.flip(flip);
    }

    if (rotate && rotate !== 0) {
      image.rotate(rotate);
    }

    if (blurRadius && blurRadius > 0) {
      image.blur(blurRadius);
    }

    return image.toBuffer(outputContentType);
  },
};
