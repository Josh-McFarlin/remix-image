import React from "react";
import Image from "remix-image";

const sizes = [
  {
    width: 300,
    height: 300,
  },
  {
    width: 100,
    height: 100,
  },
];

const IndexPage: React.FC = () => (
  <div className="root">
    <h4>Static GIF</h4>
    <section>
      {sizes.map((size) => (
        <div key={`${size.width}w${size.height}h`}>
          <Image src="/camera.gif" responsive={[{ size }]} />
        </div>
      ))}
    </section>
    <h4>Animated GIF</h4>
    <section>
      {sizes.map((size) => (
        <div key={`${size.width}w${size.height}h`}>
          <Image src="/animated-camera.gif" responsive={[{ size }]} />
        </div>
      ))}
    </section>
    <h4>Animated GIF with Background</h4>
    <section>
      {sizes.map((size) => (
        <div key={`${size.width}w${size.height}h`}>
          <Image
            src="/animated-camera.gif"
            responsive={[{ size }]}
            options={{
              background: [50, 168, 82, 255],
            }}
          />
        </div>
      ))}
    </section>
  </div>
);

export default IndexPage;
