import React, { useState, useEffect } from 'react';
import { Button, Typography, Slider } from 'antd';
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    StepBackwardOutlined,
    StepForwardOutlined,
    DownloadOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { setCurrentIndex, setIsPlaying, fetchSongs } from '../../../store/playerSlice.ts';

import './musicPlayerFooter.css'

const { Text } = Typography;

const MusicPlayerFooter: React.FC = () => {
    const dispatch = useAppDispatch();
    const { songs, currentIndex, isPlaying } = useAppSelector(state => state.player);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [currentSong, setCurrentSong] = useState(songs[currentIndex] || { name: '', author: '', image: { url: '', width: 0, height: 0 }, path: '' });

    //const currentSong = songs[currentIndex] || { name: '', author: '', image: '', path: '' };

    useEffect(() => {
        dispatch(fetchSongs());
    }, [dispatch]);

    useEffect(() => {
        setCurrentSong(songs[currentIndex] || { name: '', author: '', image: { url: '', width: 0, height: 0 }, path: '' });
    }, [currentIndex, songs]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [currentIndex, songs]);

    const onSliderChange = (value: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setCurrentTime(value);
        }
    };

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        dispatch(setIsPlaying(!isPlaying));
    };

    const nextSong = () => {
        if (!songs.length) return;
        const nextIndex = (currentIndex + 1) % songs.length;
        dispatch(setCurrentIndex(nextIndex));
        dispatch(setIsPlaying(false));
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play();
                dispatch(setIsPlaying(true));
            }
        }, 100);
    };

    const prevSong = () => {
        if (!songs.length) return;
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        dispatch(setCurrentIndex(prevIndex));
        dispatch(setIsPlaying(false));
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play();
                dispatch(setIsPlaying(true));
            }
        }, 100);
    };

    const downloadSong = () => {
        if (!currentSong.path) return;
        const link = document.createElement('a');
        link.href = currentSong.path;
        link.download = `${currentSong.name}.mp3`;
        link.click();
    };

    const handleEnded = () => {
        nextSong();
    };

    return (
        <>
            <audio ref={audioRef} src={currentSong.path} />

            <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    background: '#1e1e1e',
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 -2px 8px rgba(0,0,0,0.5)',
                    zIndex: 1000,
                    color: '#fff',
                }}
            >
                {/* Image & Song Info */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={{
                            width: 60,
                            height: 60,
                            backgroundImage: `url(${currentSong.image.url})`,
                            backgroundSize: 'cover',
                            borderRadius: '50%',
                            marginRight: 16,
                        }}
                    />
                    <div>
                        <Text style={{ color: '#fff' }}>{currentSong.name}</Text>
                        <br />
                        <Text type="secondary" style={{ color: '#ccc' }}>
                            {currentSong.author}
                        </Text>
                    </div>
                </div>

                <Slider
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={onSliderChange}
                    tooltipVisible={false}
                    step={1}
                    style={{ flex: 1, margin: '0 24px' }}
                />

                {/* Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Button className='player-button'
                        icon={<StepBackwardOutlined />}
                        type="text"
                        onClick={prevSong}
                    />
                    <Button className='player-button'
                        icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                        type="text"
                        onClick={togglePlay}
                        style={{ fontSize: 24 }}
                    />
                    <Button className='player-button'
                        icon={<StepForwardOutlined />}
                        type="text"
                        onClick={nextSong}
                    />
                    <Button className='player-button'
                        icon={<DownloadOutlined />}
                        type="text"
                        onClick={downloadSong}
                    />
                </div>
            </div>
        </>
    );
};

export default MusicPlayerFooter;
