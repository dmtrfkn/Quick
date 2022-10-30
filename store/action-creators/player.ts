import { PlayerAction, PlayerActionTypes } from "../../types/Player";
import { Track } from "../../types/Track";

export const playTrack = (): PlayerAction => {
  return {type: PlayerActionTypes.PLAY}
}

export const pauseTrack = (): PlayerAction => {
  return {type: PlayerActionTypes.PAUSE}
}
export const setDuration = (payload: number): PlayerAction => {
  return {type: PlayerActionTypes.SET_DURATION, payload}
}

export const setCurrentTime = (payload: number): PlayerAction => {
  return {type: PlayerActionTypes.SET_CURRENT_TIME, payload}
}

export const setVolume = (payload: number): PlayerAction => {
  return {type: PlayerActionTypes.SET_VOLUME, payload}
}
export const setActiveTrack  = (payload: Track): PlayerAction => {
  return {type: PlayerActionTypes.SET_ACTIVE, payload}
}