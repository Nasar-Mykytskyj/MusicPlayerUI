import { Song } from '../types/music';

export const getAuthorTopSongs = async (authorId: string): Promise<Song[]> => {
  const res = await fetch(`/spotify/user/author/${authorId}/top-tracks`);
  if (!res.ok) throw new Error('Failed to fetch author top songs');
  const data = await res.json();
  // Transform response to Song[]
  return data.tracks.map((track: any) => ({
    id: track.id,
    name: track.name,
    path: track.path,
    author: track.author,
    image: track.image,
  }));
};
