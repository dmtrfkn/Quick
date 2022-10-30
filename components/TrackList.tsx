import React, { FC } from 'react'
import { Track } from '../types/Track'
import TrackItem from './TrackItem'

import styles from '../styles/TrackList.module.scss'

interface TrackListProps {
  tracks: Track[];
}

const TrackList: FC<TrackListProps> = ({tracks}) => {
  return (
    <div className={styles.block}>
      {tracks.map(track =>
          <TrackItem key={track._id} track={track} />
        )}
    </div>
  )
}

export default TrackList