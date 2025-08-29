import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import AlbumIcon from '../../components/Album';
import AlbumList from '../../components/AlbumList';
import TextField from '../../components/TextField';
import TrackList from '../../components/TrackList';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { setTracks } from '../../store/slices/TrackSlice';
import styles from '../../styles/TrackPage.module.scss';

const Index = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    const response = await axios.get('http://localhost:4000/tracks/search?query=' + e.target.value);
    dispatch(setTracks(response.data));
  };
  if (user) {
    console.log(user.albums);
  }
  return (
    <>
      <Head>
        <title>Моя Музыка</title>
      </Head>
      <div className={styles.block}>
        <div className="container">
          <div className={styles.flex}>
            <div className={styles.header}>
              <h1>Мои треки</h1>
            </div>
            <TextField placeholder="Поиск... " value={query} onChange={search} />
          </div>
          {/* {user && user.albums.map((i) => <AlbumIcon album={i} key={i._id} />)} */}
          {user ? (
            <TrackList type={'allTacks'} tracks={user?.tracks} />
          ) : (
            <h1 className={styles.notAuth}>Авторизируйтесь для просмотра своих аудиозаписей !</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
