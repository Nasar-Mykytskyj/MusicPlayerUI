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

// {"authors":[{"href":"https://api.spotify.com/v1/artists/5icKdCmMhNMYoAzVBAWt39","id":"5icKdCmMhNMYoAzVBAWt39","name":"Dax","type":"artist","uri":"spotify:artist:5icKdCmMhNMYoAzVBAWt39","images":[{"url":"https://i.scdn.co/image/ab6761610000e5eb2a9440635255a6f4f132fc64","height":640,"width":640},{"url":"https://i.scdn.co/image/ab676161000051742a9440635255a6f4f132fc64","height":320,"width":320},{"url":"https://i.scdn.co/image/ab6761610000f1782a9440635255a6f4f132fc64","height":160,"width":160}],"external_urls":{"spotify":"https://open.spotify.com/artist/5icKdCmMhNMYoAzVBAWt39"}},
export interface Author {
  id: string;
  name: string;
  description?: string;
  image: Image;
}

export interface Song {
  id: number;
  name: string;
  author: string;
  image: Image;
  path: string;
}