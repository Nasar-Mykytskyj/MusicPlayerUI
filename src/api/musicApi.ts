import { Song } from '../types/music';

export const getAlbumSongs = async (albumId: string): Promise<Song[]> => {
  const res = await fetch(`/spotify/user/album/${albumId}/tracks`);
  if (!res.ok) throw new Error('Failed to fetch album songs');
  const data = await res.json();
  return data.tracks.map((track: any) => ({
    id: track.id,
    name: track.name,
    path: track.path,
    author: track.author,
    image: track.image,
  }));
};

export const getPlaylistSongs = async (playlistId: string): Promise<Song[]> => {
  const res = await fetch(`/spotify/user/playlist/${playlistId}/tracks`);
  if (!res.ok) throw new Error('Failed to fetch playlist songs');
  const data = await res.json();
  return data.tracks.map((track: any) => ({
    id: track.id,
    name: track.name,
    path: track.path,
    author: track.author,
    image: track.image,
  }));
};
