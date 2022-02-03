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
        maxWidth: 200,
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
        maxWidth: 200,
      },
    ],
  },
];

const IndexPage: React.FC = () => (
  <div className="root">
    <section>
      <h1>WebP</h1>
      {images.map((img) => (
        <Image
          key={img.src}
          src={img.src}
          loaderUrl="/api/image"
          responsive={img.responsive}
          options={{
            contentType: MimeType.WEBP,
          }}
        />
      ))}
    </section>
    <section>
      <h1>Gif</h1>
      {images.map((img) => (
        <Image
          key={img.src}
          src={img.src}
          loaderUrl="/api/image"
          responsive={img.responsive}
          options={{
            contentType: MimeType.GIF,
          }}
        />
      ))}
    </section>
  </div>
);

export default IndexPage;
