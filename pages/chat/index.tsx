import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import CreateChat from '../../components/CreateChat';
import Modal from '../../components/Modal';
import { WebSocketContext } from '../../contexts/WebSocketContext';
import { useAppSelector } from '../../store/hooks/redux';

import styles from '../../styles/Chat.module.scss';

const Chat = () => {
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected !');
    });
    socket.on('onMessage', (data) => {
      console.log(data);
      console.log(data.content.chatId);
    });
    socket.on('joinRoom', (data) => {
      console.log(data);
    });

    socket.on('leaveRoom', (data) => {
      console.log(data);
    });

    socket.on('updateMessage', (data) => {
      console.log(data);
    });

    socket.on('addMember', (data) => {
      console.log(data);
    });

    socket.on('removeMember', (data) => {
      console.log(data);
    });

    return () => {
      console.log('Disconnect');
      socket.off('connect');
      socket.off('onMessage');
      socket.off('joinRoom');
      socket.off('leaveRoom');
    };
  }, []);

  const socket = useContext(WebSocketContext);

  const [isOpen, setIsOpen] = useState(false);
  const setIsOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <Head>
        <title>Чатик</title>
      </Head>
      <div className={styles.block}>
        <div className="container">
          <div className={styles.headers}>
            <h1>Чаты</h1>
            {user && (
              <h1>
                <div onClick={setIsOpenHandler} className={styles.create}>
                  Создать Чат{' '}
                  {/* <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 11H13V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H11V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19V13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z"
                      fill="#40E5BE"
                    />
                  </svg> */}
                </div>
              </h1>
            )}
          </div>

          <div className={styles.chat}>
            {user ? (
              user?.chats.map((i, index) => (
                <div className={styles.thisChat} key={index}>
                  <div className={styles.flex}>
                    <Image
                      className={styles.image}
                      src={`http://localhost:4000/${i.picture}`}
                      width={100}
                      height={100}
                      alt="ChatAvatar"
                    />
                    <Link href={`/chat/${i._id}`}>
                      <a>{i.roomName}</a>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.notAuth}>Авторизируйтесь для просмотра чатов !</div>
            )}
          </div>
        </div>
      </div>
      <Modal setOpen={setIsOpenHandler} isOpen={isOpen}>
        <CreateChat setOpen={setIsOpenHandler}></CreateChat>
      </Modal>
    </>
  );
};

export default Chat;
