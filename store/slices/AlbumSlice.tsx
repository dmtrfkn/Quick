import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  albums: [],
  tracks: [],
};

export const FetchAlbums = createAsyncThunk('tracks/FetchAlbums', async () => {
  const response = await axios.get('http://localhost:4000/albums');
  return response.data;
});

export const AlbumSlice = createSlice({
  initialState,
  name: 'tracks',
  reducers: {
    setActiveAlbum: (state, action) => {
      state.tracks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchAlbums.fulfilled, (state, action) => {
      state.albums = action.payload;
    });
  },
});
export const { setActiveAlbum } = AlbumSlice.actions;
export default AlbumSlice.reducer;
