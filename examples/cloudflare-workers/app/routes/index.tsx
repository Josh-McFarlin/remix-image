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
      },
    ],
  },
  {
    src: "/camera.png",
    responsive: [
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
        maxWidth: 600,
      },
    ],
  },
];

const formatsTest = {
  filePath: "/camera.",
  fileTypes: ["jpeg", "png", "webp"],
  sizes: [
    {
      size: { width: 300, height: 300 },
    },
  ],
};

const formatMap: Record<string, MimeType> = {
  jpeg: MimeType.JPEG,
  png: MimeType.PNG,
  webp: MimeType.WEBP,
};

const IndexPage: React.FC = () => (
  <div className="root">
    <h3>Test Responsive Sizes</h3>
    <section>
      {images.map((img) => (
        <div key={img.src}>
          <Image
            src={img.src}
            loaderUrl="/api/image"
            responsive={img.responsive}
          />
        </div>
      ))}
    </section>
    <h3>Test Image Operations</h3>
    <section>
      <Image
        src={images[0].src}
        responsive={images[0].responsive}
        options={{
          rotate: 45,
        }}
      />
      <Image
        src={images[0].src}
        responsive={images[0].responsive}
        options={{
          blurRadius: 5,
        }}
      />
      <Image
        src={images[0].src}
        responsive={images[0].responsive}
        options={{
          flip: "both",
        }}
      />
      <Image
        src={images[0].src}
        responsive={images[0].responsive}
        options={{
          crop: {
            x: 0,
            y: 0,
            width: 5,
            height: 5,
          },
        }}
      />
    </section>
    <h3>Resize File Formats</h3>
    {formatsTest.fileTypes.map((inputFileType) => (
      <div key={inputFileType}>
        <h4>Input: {inputFileType}</h4>
        <section>
          {formatsTest.fileTypes.map((outputFileType) => (
            <div key={inputFileType + outputFileType}>
              <h4>Output: {outputFileType}</h4>
              <Image
                src={formatsTest.filePath + inputFileType}
                loaderUrl="/api/image"
                placeholder="blur"
                responsive={formatsTest.sizes}
                options={{
                  contentType: formatMap[outputFileType],
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
