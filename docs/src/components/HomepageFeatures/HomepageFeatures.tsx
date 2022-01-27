import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";
import styles from "./HomepageFeatures.module.css";

export type FeatureItem = {
  title: string;
  image?: string;
  description: JSX.Element;
};

const Feature: React.FC<FeatureItem> = ({ title, image, description }) => (
  <div className={styles.feature}>
    {image && <img alt={title} src={useBaseUrl(image)} />}
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

interface PropTypes {
  features: FeatureItem[];
}

const HomepageFeatures: React.FC<PropTypes> = ({ features }) => (
  <section className={styles.root}>
    {features.map((props, idx) => (
      <Feature key={idx} {...props} />
    ))}
  </section>
);

export default HomepageFeatures;
