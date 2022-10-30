import React, { FC } from 'react'
import TextField from './TextField';

import styles from '../styles/TrackProgress.module.scss'

interface TrackProgressProps {
  left?: number ;
  right?: number;
  min?: number;
  max?: number;
  tyre?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width: number
}

const TrackProgress: FC<TrackProgressProps> = ({ left, right, onChange, width, tyre, min, max }) => {
  var timeFormat = (function (){
    function num(val){
        val = Math.floor(val);
        return val < 10 ? '0' + val : val;
    }

    return function (ms: number){
        let sec = ms / 1000
          , minutes = sec / 60 % 60
          , seconds = sec % 60
        ;

        return num(minutes) + ":" + num(seconds);
    };
})();

let leftN = timeFormat(left*1000);
let rightN = timeFormat(right*1000);
  return (
    <div className={styles.block}>
      <input type='range' style={{ width: `${width}px` }} step='1' min={0} max={right} value={left ? left : min} onChange={onChange} />
      <div className={styles.numbers}>{left ? leftN : min} {tyre} {right ? rightN : max}</div>
    </div>
  )
}

export default TrackProgress
