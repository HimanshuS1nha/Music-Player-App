import {create} from 'zustand';
import {
  getAll,
  SortSongFields,
  SortSongOrder,
} from 'react-native-get-music-files';

import type {SongType} from '../types';

type UseSongsType = {
  songs: SongType[];
  getSongs: () => Promise<SongType[] | false>;
};

export const useSongs = create<UseSongsType>(set => ({
  songs: [],
  getSongs: async () => {
    const songsOrError = await getAll({
      limit: 20,
      offset: 0,
      coverQuality: 50,
      minSongDuration: 1000,
      sortBy: SortSongFields.TITLE,
      sortOrder: SortSongOrder.DESC,
    });

    if (typeof songsOrError === 'string') {
      return false;
    }

    set({songs: songsOrError});

    return songsOrError;
  },
}));
