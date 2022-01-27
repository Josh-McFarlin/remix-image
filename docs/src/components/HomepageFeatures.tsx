import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

type FeatureItem = {
  title: string;
  image?: string;
  description: JSX.Element;
};

const Feature: React.FC<FeatureItem> = ({ title, image, description }) => (
  <div className={clsx(styles.feature)}>
    {image && (
      <div className="text--center">
        <img
          className={styles.featureSvg}
          alt={title}
          src={useBaseUrl(image)}
        />
      </div>
    )}
    <div className="text--center padding-horiz--md">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

interface PropTypes {
  features: FeatureItem[];
}

const HomepageFeatures: React.FC<PropTypes> = ({ features }) => (
  <section className={styles.features}>
    {features.map((props, idx) => (
      <Feature key={idx} {...props} />
    ))}
  </section>
);

export default HomepageFeatures;
