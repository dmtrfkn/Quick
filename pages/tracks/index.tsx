/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios"
import Link from "next/link"
import Layout from "../../components/Layout"

import React, { useEffect, useState } from "react";
import TrackList from "../../components/TrackList";

import styles from '../../styles/TrackPage.module.scss'
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { FetchTracks, SearchTracks, setTracks } from "../../store/slices/TrackSlice";
import TextField from "../../components/TextField";
import Head from "next/head";

const index = () => {
    const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(FetchTracks())
  }, [])


  const [query, setQuery] = useState('')

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    const response = await axios.get('http://localhost:4000/tracks/search?query=' + e.target.value)
    dispatch(setTracks(response.data))
  }
  const { tracks } = useAppSelector(state => state.tracks)

  return (
    <>
      <Head><title>Музыка</title></Head>
      <div className={styles.block}>
          <div className="container">
            <div className={styles.flex}>
          <div className={styles.header}>
            <h1>Список треков</h1>
            <Link href='/tracks/create'><a href="">
              Загрузить
          </a></Link>
            </div>
          <TextField placeholder="Поиск... " value={query} onChange={search} />
            </div>
            <TrackList tracks={tracks} />
          </div>
        </div>
    </>

  )
}

export default index
