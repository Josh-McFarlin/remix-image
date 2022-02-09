import React from "react";
import Image from "remix-image";

const images = [
  {
    src: "https://i.imgur.com/5cQnAQC.png",
    responsive: [
      {
        size: {
          width: 100,
          height: 100,
        },
        maxWidth: 200,
      },
    ],
  },
  {
    src: "https://i.imgur.com/5cQnAQC.png",
    responsive: [],
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
        maxWidth: 200,
      },
    ],
  },
];

const formatsTest = {
  filePath: "./camera.",
  fileTypes: ["jpeg", "png", "webp"],
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

const IndexPage: React.FC = () => (
  <div className="root">
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
    <h3>File Formats</h3>
    {formatsTest.fileTypes.map((fileType) => (
      <div key={fileType}>
        <h4>{fileType}</h4>
        <section>
          {formatsTest.sizes.map((size) => (
            <div key={size.size.width + " " + size.size.height}>
              <Image
                src={formatsTest.filePath + fileType}
                loaderUrl="/api/image"
                responsive={[size]}
              />
            </div>
          ))}
        </section>
      </div>
    ))}
  </div>
);

export default IndexPage;
