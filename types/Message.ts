import { Track } from './Track';
import { User } from './User';

export type Message = {
  message: string;
  track?: Track;
  sender: User;
  chatId: string;
  hasChanged: boolean;
  _id: string;
  senderUrl: string;
};
