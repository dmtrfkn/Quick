import React, { FC, ReactComponentElement, ReactNode, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';

import styles from '../styles/Layout.module.scss';
import Player from './Player';
import Head from 'next/head';
import Links from './Link';
import { useActions } from '../store/hooks/useActions';
import { PlayerState } from '../types/Player';
import { useAppDispatch } from '../store/hooks/redux';
import axios from 'axios';
import { login } from '../store/slices/UserSlice';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: FC<LayoutProps> = ({ children, title }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get('http://localhost:4000/users/auth', {
        headers: {
          Authorization: 'Bearer' + window.localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.data) {
          dispatch(login(res.data));
        }
      });
  }, []);
  const { setActiveTrack, setCurrentTime, setVolume } = useActions();

  useEffect(() => {
    if (window.localStorage.getItem('activeTrack')) {
      const { active, volume, currentTime } = JSON.parse(
        window.localStorage.getItem('activeTrack'),
      ) as PlayerState;
      setActiveTrack(active);
      setVolume(volume);
      setCurrentTime(currentTime);
    }
  }, []);
  return (
    <div className={styles.layout}>
      <Links />
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
      <Player />
    </div>
  );
};

export default Layout;
