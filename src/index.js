import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ReduxProvider from './store/ReduxProvider.tsx';
import MyPlaylistsPage from './pages/MyPlaylistsPage.tsx';
import MyArtistPage from './pages/MyArtistPage.tsx';
import MyAlbumsPage from './pages/MyAlbumsPage.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ReduxProvider>
      <BrowserRouter>
        <Routes >
          <Route path={"/"} element={<App/>}></Route>
          <Route path={"/login"} element={<LoginPage/>}></Route>
          <Route path={"/home"} element={<Home/>}></Route>
          <Route path={"/my-playlists"} element={<MyPlaylistsPage/>}></Route>
          <Route path={"/my-artists" } element={<MyArtistPage/>}></Route>
          <Route path={"/my-albums" } element={<MyAlbumsPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
