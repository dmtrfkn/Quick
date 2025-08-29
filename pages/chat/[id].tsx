import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { WebSocketContext } from '../../contexts/WebSocketContext';
import { Chat } from '../../types/Chat';

import styles from '../../styles/ChatForId.module.scss';
import Head from 'next/head';
import TextField from '../../components/TextField';
import { useAppSelector } from '../../store/hooks/redux';
import TrackItem from '../../components/TrackItem';
import Modal from '../../components/Modal';
import ChatMenu from '../../components/ChatMenu';

export default function ChatPage() {
  const socket = useContext(WebSocketContext);
  const { is, user } = useAppSelector((state) => state.user);
  const [chat, setChat] = useState<Chat>();
  const router = useRouter();
  const id = router.query.id as string;
  let [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const emoji = [
    `😀`,
    `😃`,
    `😄`,
    `😁`,
    `😆`,
    `😅`,
    `😂`,
    `🤣`,
    `😇`,
    `😉`,
    `😊`,
    `🙂`,
    `🙃`,
    `😋`,
    `😌`,
    `😍`,
    `🥰`,
    `😘`,
    `😗`,
    `😙`,
    `😚`,
    `🥲`,
    `🤪`,
    `😜`,
    `😝`,
    `😛`,
    `🤑`,
    `😎`,
    `🤓`,
    `🥸`,
    `🧐`,
    `🤠`,
    `🥳`,
    `🤡`,
    `😏`,
    `😶`,
    `🫥`,
    `😐`,
    `🫤`,
    `😑`,
    `😒`,
    `🙄`,
    `🤨`,
    `🤔`,
    `🤫`,
    `🤭`,
    `🫢`,
    `🫡`,
    `🤗`,
    `🫣`,
    `🤥`,
    `😳`,
    `😞`,
    `😟`,
    `😤`,
    `😠`,
    `😡`,
    `🤬`,
    `😔`,
    `😕`,
    `🙁`,
    `😬`,
    `🥺`,
    `😣`,
    `😖`,
    `😫`,
    `😩`,
    `🥱`,
    `😪`,
    `😮‍💨`,
    `😮`,
    `😱`,
    `😨`,
    `😰`,
    `😥`,
    `😓`,
    `😯`,
    `😦`,
    `😧`,
    `🥹`,
    `😢`,
    `😭`,
    `🤤`,
    `🤩`,
    `😵`,
    `😵‍💫`,
    `🥴`,
    `😲`,
    `🤯`,
    `🫠`,
    `🤐`,
    `😷`,
    `🤕`,
    `🤒`,
    `🤮`,
    `🤢`,
    `🤧`,
    `🥵`,
    `🥶`,
    `😶‍🌫️`,
    `😴`,
    `💤`,
  ];
  useEffect(() => {
    if (id) {
      socket.emit('join', id);
      axios.get(`http://localhost:4000/chats/${id}`).then((res) => {
        setChat(res.data);
        // console.log(res.data);
      });
    }

    document.onkeydown = function (e) {
      const mes = message.slice(0, message.length - 1);
      if (e.keyCode === 8) {
        setMessage(mes);
      }
    };
  }, [id]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected !');
    });
    socket.on('onMessage', (data) => {
      console.log(data);
      const newMessage = { ...data.content, sender: { _id: data.content.sender } };
      setChat({ ...chat, messages: [...chat.messages, newMessage] });
    });
    socket.on('joinRoom', (data) => {
      // console.log(data);
    });

    socket.on('leaveRoom', (data) => {
      // console.log(data);
    });

    socket.on('updateMessage', (data) => {
      // console.log(data);
    });

    socket.on('addMember', (data) => {
      // console.log(data);
    });

    socket.on('removeMember', (data) => {
      // console.log(data);
    });
    window.scroll(0, document.body.scrollHeight);

    return () => {
      console.log('Disconnect');
      socket.off('connect');
      socket.off('onMessage');
      socket.off('joinRoom');
      socket.off('leaveRoom');
    };
  }, [chat]);

  const onClickHandler = () => {
    if (message) {
      socket.emit('newMessage', {
        message: message,
        sender: user._id,
        senderUrl: user.pictureUrl,
        chatId: chat._id,
        hasChanged: false,
      });
      setMessage('');
    }
  };

  const onOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  const onClickSmile = (value: string) => {
    setMessage((message += value));
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes('0123456789!@#$%ˆ&*()_+/|qwertyuiop[]asdfghjkl;zxcvbnm,./')) {
      setMessage(e.target.value);
    }
  };

  const onClickMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Head>
        <title>{chat && chat.roomName}</title>
      </Head>
      <div className={styles.page}>
        <div className="container">
          <div className={styles.header} onClick={onClickMenu}>
            {chat && (
              <Image
                className={styles.image}
                width={70}
                height={70}
                alt="RoomImage"
                src={chat && `http://localhost:4000/${chat.picture}`}
              />
            )}
            <h1>{chat && chat.roomName}</h1>
          </div>
          <div className={styles.padding}>
            {chat &&
              chat.messages.map((i, index) => (
                <div
                  className={user._id !== i.sender._id ? styles.message : styles.senderMessage}
                  key={index}>
                  <div className={styles.avatar}>
                    <Image
                      className={styles.image}
                      width={70}
                      height={70}
                      alt="User Avatar"
                      src={`http://localhost:4000/${i.senderUrl}`}
                    />{' '}
                  </div>
                  {i.track ? (
                    <div className={styles.track}>
                      <TrackItem track={i.track} type="allTacks" />
                    </div>
                  ) : (
                    <div className={user._id === i.sender._id ? styles.senderText : styles.text}>
                      {i.message}
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className={styles.flex}>
            {isOpen && (
              <div className={styles.smileBlock}>
                {emoji.map((i, ind) => (
                  <div className={styles.smile} key={ind} onClick={() => onClickSmile(i)}>
                    {i}
                  </div>
                ))}
              </div>
            )}
            <TextField
              width={600}
              type="text"
              value={message}
              onChange={(e) => onChangeHandler(e)}
              placeholder="Выберите реакцию..."></TextField>

            <div className={styles.send} onClick={onClickHandler}>
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="#00FFC3"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3_299)">
                  <path
                    d="M12.0503 12.0505C11.8627 11.8629 11.6084 11.7576 11.3431 11.7576C11.0779 11.7576 10.8236 11.8629 10.636 12.0505C10.4485 12.238 10.3431 12.4924 10.3431 12.7576C10.3431 13.0228 10.4485 13.2772 10.636 13.4647C11.5737 14.4024 12.1005 15.6742 12.1005 17.0002C12.1005 18.3263 11.5737 19.5981 10.636 20.5358C10.4485 20.7233 10.3431 20.9777 10.3431 21.2429C10.3431 21.5081 10.4485 21.7624 10.636 21.95C10.8236 22.1375 11.0779 22.2429 11.3431 22.2429C11.6084 22.2429 11.8627 22.1375 12.0503 21.95C13.363 20.6372 14.1005 18.8567 14.1005 17.0002C14.1005 15.1437 13.363 13.3632 12.0503 12.0505ZM17.7071 6.39363C17.5196 6.20609 17.2652 6.10074 17 6.10074C16.7348 6.10074 16.4804 6.20609 16.2929 6.39363C16.1054 6.58117 16 6.83552 16 7.10074C16 7.36595 16.1054 7.62031 16.2929 7.80784C18.7309 10.2458 20.1005 13.5524 20.1005 17.0002C20.1005 20.448 18.7309 23.7546 16.2929 26.1926C16.1054 26.3802 16 26.6345 16 26.8997C16 27.1649 16.1054 27.4193 16.2929 27.6068C16.4804 27.7944 16.7348 27.8997 17 27.8997C17.2652 27.8997 17.5196 27.7944 17.7071 27.6068C20.5202 24.7938 22.1005 20.9785 22.1005 17.0002C22.1005 13.022 20.5202 9.20668 17.7071 6.39363V6.39363ZM14.8787 9.22206C14.6911 9.03452 14.4368 8.92916 14.1716 8.92916C13.9064 8.92916 13.652 9.03452 13.4645 9.22206C13.2769 9.40959 13.1716 9.66395 13.1716 9.92916C13.1716 10.1944 13.2769 10.4487 13.4645 10.6363C15.1523 12.3241 16.1005 14.6133 16.1005 17.0002C16.1005 19.3872 15.1523 21.6764 13.4645 23.3642C13.2769 23.5517 13.1716 23.8061 13.1716 24.0713C13.1716 24.3365 13.2769 24.5909 13.4645 24.7784C13.652 24.9659 13.9064 25.0713 14.1716 25.0713C14.4368 25.0713 14.6911 24.9659 14.8787 24.7784C16.9416 22.7155 18.1005 19.9176 18.1005 17.0002C18.1005 14.0829 16.9416 11.285 14.8787 9.22206V9.22206Z"
                    fill="#00FFC3"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3_299">
                    <rect
                      width="24"
                      height="24"
                      fill="#00FFC3"
                      transform="translate(17 0.0292969) rotate(45)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className={styles.smiles} onClick={onOpenClick}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.99992 13H13.9999C14.2651 13 14.5195 12.8946 14.707 12.7071C14.8946 12.5196 14.9999 12.2652 14.9999 12C14.9999 11.7348 14.8946 11.4804 14.707 11.2929C14.5195 11.1054 14.2651 11 13.9999 11H9.99992C9.73471 11 9.48035 11.1054 9.29282 11.2929C9.10528 11.4804 8.99992 11.7348 8.99992 12C8.99992 12.2652 9.10528 12.5196 9.29282 12.7071C9.48035 12.8946 9.73471 13 9.99992 13V13ZM18.9999 3H4.99992C4.29638 3.00546 3.61714 3.25801 3.08093 3.71352C2.54473 4.16902 2.18567 4.79849 2.06653 5.49189C1.94738 6.18529 2.07574 6.89851 2.42915 7.50687C2.78257 8.11523 3.33855 8.58002 3.99992 8.82V18C3.99992 18.7956 4.316 19.5587 4.8786 20.1213C5.44121 20.6839 6.20428 21 6.99992 21H16.9999C17.7956 21 18.5586 20.6839 19.1212 20.1213C19.6839 19.5587 19.9999 18.7956 19.9999 18V8.82C20.6613 8.58002 21.2173 8.11523 21.5707 7.50687C21.9241 6.89851 22.0525 6.18529 21.9333 5.49189C21.8142 4.79849 21.4551 4.16902 20.9189 3.71352C20.3827 3.25801 19.7035 3.00546 18.9999 3ZM17.9999 18C17.9999 18.2652 17.8946 18.5196 17.707 18.7071C17.5195 18.8946 17.2651 19 16.9999 19H6.99992C6.73471 19 6.48035 18.8946 6.29282 18.7071C6.10528 18.5196 5.99992 18.2652 5.99992 18V9H17.9999V18ZM18.9999 7H4.99992C4.73471 7 4.48035 6.89464 4.29282 6.70711C4.10528 6.51957 3.99992 6.26522 3.99992 6C3.99992 5.73478 4.10528 5.48043 4.29282 5.29289C4.48035 5.10536 4.73471 5 4.99992 5H18.9999C19.2651 5 19.5195 5.10536 19.707 5.29289C19.8946 5.48043 19.9999 5.73478 19.9999 6C19.9999 6.26522 19.8946 6.51957 19.707 6.70711C19.5195 6.89464 19.2651 7 18.9999 7Z"
                  fill="#fff"
                />
              </svg>
            </div>
          </div>
          <Modal isOpen={menuOpen} setOpen={onClickMenu}>
            <ChatMenu setIsOpen={onClickMenu} chat={chat} />
          </Modal>
        </div>
      </div>
    </>
  );
}
