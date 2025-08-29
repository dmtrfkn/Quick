import { Track } from './Track';

export interface PlayerState {
  active: null | Track;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
  add: boolean;
  playList: Track[];
}

export enum PlayerActionTypes {
  ADD = 'ADD',
  PLAYLIST = 'PLAYLIST',
  REMOVE = 'REMOVE',
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  SET_ACTIVE = 'SET_ACTIVE',
  SET_DURATION = 'SET_DURATION',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  SET_VOLUME = 'SET_VOLUME',
}

export interface AddAction {
  type: PlayerActionTypes.ADD;
}

export interface PlayListAction {
  type: PlayerActionTypes.PLAYLIST;
  payload: Track[];
}

export interface RemoveAction {
  type: PlayerActionTypes.REMOVE;
}

export interface PlayAction {
  type: PlayerActionTypes.PLAY;
}

export interface PauseAction {
  type: PlayerActionTypes.PAUSE;
}
export interface SetActiveAction {
  type: PlayerActionTypes.SET_ACTIVE;
  payload: Track;
}
export interface SetDurationAction {
  type: PlayerActionTypes.SET_DURATION;
  payload: number;
}
export interface SetCurrentTimeAction {
  type: PlayerActionTypes.SET_CURRENT_TIME;
  payload: number;
}

export interface SetVolumeAction {
  type: PlayerActionTypes.SET_VOLUME;
  payload: number;
}

export type PlayerAction =
  | PlayListAction
  | RemoveAction
  | AddAction
  | PlayAction
  | PauseAction
  | SetActiveAction
  | SetDurationAction
  | SetCurrentTimeAction
  | SetVolumeAction;
