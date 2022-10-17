import { Album } from "./Album";
import { Track } from "./Track";

export type User = {
  _id: string;
  nick: string;
  email: string;
  password: string;
  tracks: Track[];
  albums: Album[];
};
