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
      <div key={img.src}>
        <Image
          src={img.src}
          loaderUrl="/api/image"
          responsive={img.responsive}
        />
      </div>
    ))}
  </div>
);

export default IndexPage;
