import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Song } from '../types/music';

export interface Image {
  url: string;
  width: number;
  height: number;
}

interface PlayerState {
  songs: Song[];
  currentIndex: number;
  isPlaying: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: PlayerState = {
  songs: [],
  currentIndex: 0,
  isPlaying: false,
  loading: false,
  error: null,
};

export interface SongsResponse {
  songs: Song[];
}

// Async thunk to fetch songs from backend
export const fetchSongs = createAsyncThunk<SongsResponse>('/user/fetchSongs', async () => {
  const response = await fetch('/spotify/user/songs'); // Change to your backend endpoint
  if (!response.ok) throw new Error('Failed to fetch songs');
  return response.json();
});

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setSongs(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
    },
    addSong(state, action: PayloadAction<Song>) {
      state.songs.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.songs = action.payload.songs;
        state.loading = false;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch songs';
      });
  },
});

export const { setCurrentIndex, setIsPlaying, setSongs, addSong } = playerSlice.actions;
export default playerSlice.reducer;
