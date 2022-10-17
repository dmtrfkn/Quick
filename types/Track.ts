import { Comment } from "./Comment";

export type Track = {
  _id: string;
  name: string;
  artist: string;
  text: string;
  category: string;
  listens: number;
  picture: string;
  audio: string;
  comments: Comment[];
};
