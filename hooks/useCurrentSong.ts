import {create} from 'zustand';

import type {SongType} from '../types';

type UseCurrentSongType = {
  currentSong: SongType | null;
  setCurrentSong: (currentSong: SongType | null) => void;
};

export const useCurrentSong = create<UseCurrentSongType>(set => ({
  currentSong: null,
  setCurrentSong: currentSong => set({currentSong}),
}));
