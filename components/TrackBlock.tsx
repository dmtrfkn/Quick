import Image from "next/image";
import styles from "../styles/TrackBlock.module.scss";

const TrackBlock = ({ heading, filterTracks }) => {
  return (
    <div className={styles.block}>
      <h1 className={styles["h1"]}>{heading}</h1>
      <div className={styles.track}></div>
    </div>
  );
};

export default TrackBlock;
