// src/types/music.ts
export interface Image {
  url: string;
  height?: number;
  width?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  image: Image;
  totalTracks: number;
}