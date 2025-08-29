import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux';
import { FetchAlbums } from '../store/slices/AlbumSlice';
import { Album } from '../types/Album';
import AlbumIcon from './Album';
import AlbumItem from './AlbumItem';

const AlbumList = () => {
  const dispatch = useAppDispatch();
  const { albums }: { albums: Album[] } = useAppSelector((state) => state.albums);
  useEffect(() => {
    dispatch(FetchAlbums());
  }, []);

  return <div>{albums && albums.map((album) => <AlbumIcon key={album._id} album={album} />)}</div>;
};

export default AlbumList;
