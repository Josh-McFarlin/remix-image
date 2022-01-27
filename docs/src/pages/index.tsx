import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "../components/HomepageFeatures";
import styles from "./index.module.css";

const features = [
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
    title: "Focus on What Matters",
    description: (
      <>
        Setup the library once and Remix-Image will automatically create dynamic
        images on demand and cache them for the best performance. Never worry
        about generating images manually ever again.
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
      <main>
        <HomepageFeatures features={features} />
      </main>
    </Layout>
  );
};

export default IndexPage;
