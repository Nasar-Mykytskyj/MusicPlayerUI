import { Playlist, Author } from '../types/music';

export const getRecommendedPlaylists = async (offset: number, limit: number): Promise<Playlist[]> => {
  const res = await fetch(`/spotify/user/playlists/recommended?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch recommended playlists');
  const data = await res.json();
  // Transform the response
  return data.playlists.map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    image: {
      url: p.images && p.images.length > 0 ? p.images[0].url : '',
      height: p.images && p.images.length > 0 ? p.images[0].height : undefined,
      width: p.images && p.images.length > 0 ? p.images[0].width : undefined,
    },
    totalTracks: p.tracks?.Total ?? 0,
  }));
};

export const getRecommendedAuthors = async (offset: number, limit: number): Promise<Author[]> => {
  const res = await fetch(`/spotify/user/authors/recommended?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch recommended authors');
  const data = await res.json();
  // Transform the response
  return data.authors.map((a: any) => ({
    id: a.id,
    name: a.name,
    description: a.description,
    image: {
      url: a.images && a.images.length > 0 ? a.images[0].url : '',
      height: a.images && a.images.length > 0 ? a.images[0].height : undefined,
      width: a.images && a.images.length > 0 ? a.images[0].width : undefined,
    },
  }));
};

export const getRecommendedAlbums = async (offset: number, limit: number): Promise<Playlist[]> => {
  const res = await fetch(`/spotify/user/albums/recommended?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch recommended albums');
  const data = await res.json();
  // Transform the response
  return data.albums.map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    image: {
      url: p.images && p.images.length > 0 ? p.images[0].url : '',
      height: p.images && p.images.length > 0 ? p.images[0].height : undefined,
      width: p.images && p.images.length > 0 ? p.images[0].width : undefined,
    },
  }));
};
