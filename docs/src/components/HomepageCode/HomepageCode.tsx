import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import clsx from "clsx";
import styles from "./HomepageCode.module.css";

export type CodeItem = {
  title: string;
  code: string;
};

const Code: React.FC<CodeItem> = ({ title, code }) => (
  <div className={styles.block}>
    <h3>{title}</h3>

    <Highlight {...defaultProps} code={code} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={clsx(className, styles.code)} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  </div>
);

interface PropTypes {
  codeBlocks: CodeItem[];
}

const HomepageCode: React.FC<PropTypes> = ({ codeBlocks }) => (
  <section className={styles.root}>
    {codeBlocks.map((props, idx) => (
      <Code key={idx} {...props} />
    ))}
  </section>
);

export default HomepageCode;
