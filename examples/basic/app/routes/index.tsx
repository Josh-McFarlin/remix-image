import React from "react";
import Image, { MimeType } from "remix-image";

const images = [
  {
    src: "https://i.imgur.com/5cQnAQC.png",
    responsive: [
      {
        size: {
          width: 100,
          height: 100,
        },
        maxWidth: 500,
      },
      {
        size: {
          width: 600,
          height: 600,
        },
      },
    ],
  },
  {
    src: "/camera.png",
    responsive: [
      {
        size: {
          width: 100,
          height: 100,
        },
        maxWidth: 500,
      },
      {
        size: {
          width: 300,
          height: 300,
        },
      },
    ],
  },
];

const formatsTest = {
  filePath: "./camera.",
  fileTypes: ["jpeg", "png", "gif", "bmp"],
  sizes: [
    {
      size: {
        width: 300,
        height: 300,
      },
    },
    {
      size: {
        width: 100,
        height: 100,
      },
    },
  ],
};

const formatMap: Record<string, MimeType> = {
  jpeg: MimeType.JPEG,
  png: MimeType.PNG,
  gif: MimeType.GIF,
  bmp: MimeType.BMP,
  tif: MimeType.TIFF,
};

const IndexPage: React.FC = () => (
  <div className="root">
    <section>
      {images.map((img) => (
        <div key={img.src}>
          <Image
            src={img.src}
            loaderUrl="/api/image"
            responsive={img.responsive}
            dprVariants={[1, 3]}
          />
        </div>
      ))}
    </section>
    <h3>Resize But Keep Initial File Formats</h3>
    {formatsTest.fileTypes.map((fileType) => (
      <div key={fileType}>
        <h4>
          {fileType} {"==>"} {fileType}
        </h4>
        <section>
          {formatsTest.sizes.map((size) => (
            <div key={size.size.width + " " + size.size.height}>
              <Image
                src={formatsTest.filePath + fileType}
                loaderUrl="/api/image"
                responsive={[size]}
                placeholder="blur"
                options={{
                  contentType: formatMap[fileType],
                }}
              />
            </div>
          ))}
        </section>
      </div>
    ))}
    <h3>Resize PNG To File Formats</h3>
    {formatsTest.fileTypes.map((fileType) => (
      <div key={fileType}>
        <h4>
          PNG {"==>"} {fileType}
        </h4>
        <section>
          {formatsTest.sizes.map((size) => (
            <div key={size.size.width + " " + size.size.height}>
              <Image
                src={formatsTest.filePath + "png"}
                loaderUrl="/api/image"
                placeholder="blur"
                responsive={[size]}
                options={{
                  contentType: formatMap[fileType],
                }}
              />
            </div>
          ))}
        </section>
      </div>
    ))}
  </div>
);

export default IndexPage;
