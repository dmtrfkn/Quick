import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PlayerState } from "../../types/Player";
import { Track } from "../../types/Track";
import { User } from "../../types/User";

const initialState = {
  tracks: [],
};

export const FetchTracks = createAsyncThunk(
  'tracks/FetchTracks',
  async () => {
    const response = await axios.get('http://localhost:4000/tracks')
    return response.data
  }
)

export const SearchTracks = createAsyncThunk(
  'tracks/SearchTracks',
  async(query: string) => {
    const response = await axios.get('http://localhost:4000/tracks/search?query=' + query)
    return response.data
  }
)

export const TrackSlice = createSlice({
  initialState,
  name: "tracks",
  reducers: {
    setTracks: (state, action) => {
      state.tracks = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(FetchTracks.fulfilled, (state, action) => {
          state.tracks = action.payload
        })
    }
  }
);
export const {setTracks} = TrackSlice.actions
export default TrackSlice.reducer;
