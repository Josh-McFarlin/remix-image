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

const IndexPage: React.FC = () => (
  <div className="root">
    {images.map((img) => (
      <Image
        key={img.src}
        src={img.src}
        loaderUrl="/api/image"
        responsive={img.responsive}
      />
    ))}
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
  </div>
);

export default IndexPage;
