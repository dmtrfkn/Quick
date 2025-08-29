import Image from 'next/image';
import React, { FC, useState } from 'react';
import { useAppDispatch } from '../store/hooks/redux';
import { setActiveAlbum } from '../store/slices/AlbumSlice';
import { Album } from '../types/Album';
import { Track } from '../types/Track';
import AlbumItem from './AlbumItem';
import Modal from './Modal';

import styles from '../styles/Album.module.scss';

interface AlbumIconProps {
  album: Album;
}

const AlbumIcon: FC<AlbumIconProps> = ({ album }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const openHandler = () => {
    setOpenWindow();
    dispatch(setActiveAlbum(album.tracks));
  };
  const setOpenWindow = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <div onClick={openHandler} className={styles.block}>
        <Image
          className={styles.image}
          src={`http://localhost:4000/${album.pictureUrl}`}
          width={200}
          height={200}
          alt="albumImage"
        />
        <div className={styles.name}>{album.name}</div>
      </div>
      <Modal isOpen={open} setOpen={setOpenWindow}>
        <AlbumItem album={album} />
      </Modal>
    </>
  );
};

export default AlbumIcon;
