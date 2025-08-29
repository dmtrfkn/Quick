import { Album } from './Album';
import { Chat } from './Chat';
import { Track } from './Track';

export type User = {
  _id: string;
  nick: string;
  email: string;
  password: string;
  tracks: Track[];
  albums: Album[];
  chats: Chat[];
  pictureUrl: string;
};
