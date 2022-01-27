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
    title: "Focus on What Matters",
    description: (
      <>
        Setup the library once and Remix-Image will automatically create dynamic
        images on demand and cache them for the best performance.
      </>
    ),
  },
  {
    title: "Easy to Use",
    description: (
      <>
        Remix-Image was designed to be easily installed and used to get your
        Remix app up and running quickly.
      </>
    ),
  },

  {
    title: "Made for Remix",
    description: (
      <>
        Designed from the ground up to work with{" "}
        <a href="https://remix.run">Remix</a> on all of its supported platforms.
      </>
    ),
  },
];

const codeBlocks: CodeItem[] = [
  {
    title: "Turns",
    code:
      "<Image\n" +
      '  src="https://i.imgur.com/5cQnAQC.png"\n' +
      "  responsive={[{\n" +
      "    size: {\n" +
      "      width: 100,\n" +
      "      height: 100,\n" +
      "    },\n" +
      "    maxWidth: 200,\n" +
      "  }]}\n" +
      "/>",
  },
  {
    title: "Into",
    code:
      "<img\n" +
      '  class="Image-module_root__56rgX"\n' +
      '  src="/api/image?src=https%253A%252F%252Fi.imgur.com%252F5cQnAQC.png&amp;width=100&amp;height=100%2520100w"\n' +
      '  srcset="/api/image?src=https%253A%252F%252Fi.imgur.com%252F5cQnAQC.png&amp;width=100&amp;height=100%2520100w"\n' +
      '  sizes="(max-width: 200px) 100px"\n' +
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
            <HomepageCode codeBlocks={codeBlocks} />
            <p>
              Where the <code>responsive</code> sizes provided through the props
              are turned into image URLs served by the local server. This
              enables sending the smallest images possible to the client,
              allowing pages to load much faster. These images can also be
              cached on the server for the best performance.
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
