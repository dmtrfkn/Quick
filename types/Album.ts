import { Track } from "./Track";

export type Album = {
  _id: string;
  name: string;
  artist: string;
  pictureUrl: string;
  tracks: Track[];
};
