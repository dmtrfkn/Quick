import { Message } from './Message';
import { User } from './User';

export type Chat = {
  _id: string;
  messages: Message[];
  members: User[];
  roomName: string;
  picture: string;
};
