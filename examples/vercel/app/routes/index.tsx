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
        maxWidth: 600,
      },
      {
        size: {
          width: 300,
          height: 300,
        },
      },
    ],
  },
  {
    src: "/camera-transparent.webp",
    responsive: [
      {
        size: {
          width: 300,
          height: 300,
        },
        maxWidth: 600,
      },
      {
        size: {
          width: 100,
          height: 100,
        },
      },
    ],
  },
];

const IndexPage: React.FC = () => (
  <div className="root">
    {images.map((img) => (
      <Image
        key={img.src}
        src={img.src}
        loaderUrl="/api/image"
        responsive={img.responsive}
        placeholder="blur"
        options={{
          contentType: MimeType.WEBP,
        }}
      />
    ))}
  </div>
);

export default IndexPage;
