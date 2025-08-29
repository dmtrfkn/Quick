import axios from 'axios';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import styles from '../styles/ChatMenu.module.scss';
import { Chat } from '../types/Chat';
import Modal from './Modal';

interface ChatMenuProps {
  chat: Chat;
  setIsOpen?: () => void;
}

const ChatMenu: FC<ChatMenuProps> = ({ chat, setIsOpen }) => {
  useEffect(() => {}, [chat]);
  const [open, setOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState<string>('');

  const openHandler = (memberId: string) => {
    setOpen((prev) => !prev);
    setDeleteUser(memberId);
  };

  const onDeleteHandler = () => {
    if (chat.members.length === 1) {
      axios.patch('http://localhost:4000/chats/deleteChat', chat._id);
    }
    axios.patch('http://localhost:4000/chats/removeMember', {
      member: deleteUser,
      roomId: chat._id,
    });
    console.log(deleteUser, chat._id);

    setIsOpen();
  };
  return (
    <div className={styles.block}>
      <div className="containter">
        <div className={styles.header}>
          <Image
            className={styles.image}
            src={`http://localhost:4000/${chat.picture}`}
            width={100}
            height={100}
            alt="ChatAvatar"
          />
          <h1>{chat.roomName}</h1>
        </div>
        <div className={styles.memberBlock}>
          <h2>Участники</h2>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 11H13V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H11V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19V13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z"
              fill="#40E5BE"
            />
          </svg>
        </div>
        <div className={styles.members}>
          {chat &&
            chat.members.map((i, index) => (
              <div key={index}>
                <div className={styles.item}>
                  <div className={styles.flex}>
                    <Image
                      className={styles.image}
                      src={`http://localhost:4000/${i.pictureUrl}`}
                      width={50}
                      height={50}
                      alt="UserAvatar"
                    />
                    <div className={styles.user}>{i.nick}</div>
                  </div>
                  <svg
                    onClick={() => openHandler(i._id)}
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21.2424 11.3431L16.9997 15.5858L12.7571 11.3431C12.5696 11.1556 12.3152 11.0503 12.05 11.0503C11.7848 11.0503 11.5304 11.1556 11.3429 11.3431C11.1554 11.5307 11.05 11.785 11.05 12.0503C11.05 12.3155 11.1554 12.5698 11.3429 12.7574L15.5855 17L11.3429 21.2426C11.1554 21.4302 11.05 21.6845 11.05 21.9497C11.05 22.215 11.1554 22.4693 11.3429 22.6569C11.5304 22.8444 11.7848 22.9497 12.05 22.9497C12.3152 22.9497 12.5696 22.8444 12.7571 22.6569L16.9997 18.4142L21.2424 22.6569C21.4299 22.8444 21.6843 22.9497 21.9495 22.9497C22.2147 22.9497 22.4691 22.8444 22.6566 22.6569C22.8441 22.4693 22.9495 22.215 22.9495 21.9497C22.9495 21.6845 22.8441 21.4302 22.6566 21.2426L18.414 17L22.6566 12.7574C22.8441 12.5698 22.9495 12.3155 22.9495 12.0503C22.9495 11.785 22.8441 11.5307 22.6566 11.3431C22.4691 11.1556 22.2147 11.0503 21.9495 11.0503C21.6843 11.0503 21.4299 11.1556 21.2424 11.3431Z"
                      fill="#606060"
                    />
                  </svg>
                </div>
              </div>
            ))}
        </div>
        {open && (
          <div className={styles.delete}>
            <h1>Вы уверены что хотите удалить участника?</h1>
            <button onClick={onDeleteHandler}>ДА</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMenu;
