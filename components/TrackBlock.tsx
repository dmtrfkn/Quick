import React from 'react'

const TrackBlock = () => {
  return (
    <div>TrackBlock</div>
  )
}

export default TrackBlock
// import axios from "axios";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import styles from "../styles/TrackBlock.module.scss";
// import Track from "./TrackItem";


// const TrackBlock = ({ heading }) => {
//   const [tracks, setTracks] = useState([])
//   useEffect(() => {

//     axios.get('http://localhost:4000/tracks').then(res => setTracks(res.data))
//   }, [])

//     console.log(tracks);


//   return (
//     <div className={styles.block}>
//       <h1 className={styles["h1"]}>{heading}</h1>
//       {tracks.map(track =>
// <>
//       {/* <audio key={track.name} src={`http://localhost:4000/${track.audio}`} controls></audio> */}
//         {/* <Track audio={track.audio} image={track.picture} key={track._id} trackName={track.name} /> */}

// </>
//         )}
//       <div>ПОДРОБНЕЕ...</div>
//     </div>
//   );
// };

// export default TrackBlock;
