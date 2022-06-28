import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures, { FeatureItem } from "../components/HomepageFeatures";
import HomepageCode, { CodeItem } from "@site/src/components/HomepageCode";
import styles from "./index.module.css";

const features: FeatureItem[] = [
  {
    title: "Optimize Performance",
    description: (
      <>
        Remix-Image will automatically create dynamic images on demand and cache
        them for the best performance. You can serve images to your users in the
        most efficient file formats to improve page loads and save bandwidth.
      </>
    ),
  },
  {
    title: "Save Time",
    description: (
      <>
        Setup the library once and Remix-Image will automatically create dynamic
        images on demand and cache them for the best performance. You will
        longer need to manually convert and compress your images every time you
        make changes.
      </>
    ),
  },
  {
    title: "Save Money",
    description: (
      <>
        Remix-Image runs as a Loader Function in your existing Remix server.
        This means you do not have to setup additional servers for image
        transformation or pay for services such as Cloudinary.
      </>
    ),
  },
];

const codeBlocks: CodeItem[] = [
  {
    title: "Turning",
    code:
      "<Image\n" +
      '  src="https://i.imgur.com/5cQnAQC.png"\n' +
      "  responsive={[\n" +
      "    {\n" +
      "      size: { width: 100, height: 100 },\n" +
      "      maxWidth: 500,\n" +
      "    },\n" +
      "    {\n" +
      "      size: { width: 600, height: 600 },\n" +
      "    },\n" +
      "  ]}\n" +
      "  dprVariants={[1, 3]}\n" +
      "/>",
  },
  {
    title: "Into",
    code:
      "<img\n" +
      '  src="/api/image?src=https%3A%2F%2Fi.imgur.com%2F5cQnAQC.png&width=600&height=600"\n' +
      '  srcset="/api/image?src=https%3A%2F%2Fi.imgur.com%2F5cQnAQC.png&width=100&height=100 100w, /api/image?src=https%3A%2F%2Fi.imgur.com%2F5cQnAQC.png&width=600&height=600 600w, /api/image?src=https%3A%2F%2Fi.imgur.com%2F5cQnAQC.png&width=300&height=300 300w, /api/image?src=https%3A%2F%2Fi.imgur.com%2F5cQnAQC.png&width=1800&height=1800 1800w"\n' +
      '  sizes="(max-width: 500px) 100px, 600px"\n' +
      ">",
  },
];

const HomepageHeader: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/tutorial-basics/install"
          >
            Remix-Image Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
};

const IndexPage: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeader />
      <main className={styles.main}>
        <div className={styles.content}>
          <section>
            <h2>What</h2>
            <h3>Remix Image Supports:</h3>
            <ul>
              <li>
                <b>Format Conversion:</b> Convert your large png images into
                more efficient file formats like webp
              </li>
              <li>
                <b>Image Resizing:</b> Resize your 1600x1600 px image into a
                200x200 px image to load much faster when a large image is not
                needed
              </li>
              <li>
                <b>Image Transformations:</b> Apply image transformations such
                as <code>resize</code>, <code>crop</code>, <code>rotate</code>,{" "}
                <code>blur</code>, and <code>flip</code>
              </li>
            </ul>
            <br />
            <HomepageCode codeBlocks={codeBlocks} />
            <p>
              Remix-Image turns the <code>responsive</code> sizes provided
              through the props into image URLs served by the Remix server. This
              enables sending the smallest images possible to the client,
              allowing pages to load much faster.
            </p>
          </section>
          <section>
            <h2>Why</h2>
            <HomepageFeatures features={features} />
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default IndexPage;
