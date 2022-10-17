import React from "react";

import styles from "../styles/NewsBlock.module.scss";

interface NewsProps {
  h1: string;
  text: string;
  children: HTMLElement;
}

const NewsBlock = ({ h1, text, children }) => {
  return (
    <div className={styles.block}>
      <div className={styles["h1"]}>
        {h1}
        {children}
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default NewsBlock;
