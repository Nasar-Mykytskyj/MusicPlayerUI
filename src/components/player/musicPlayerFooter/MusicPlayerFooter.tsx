import React, { useState, useEffect } from 'react';
import { Button, Typography, Slider } from 'antd';
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    StepBackwardOutlined,
    StepForwardOutlined,
    DownloadOutlined,
} from '@ant-design/icons';

import './musicPlayerFooter.css'

const { Text } = Typography;

interface Song {
    id: number;
    name: string;
    author: string;
    image: string;
    path: string;
}

const songs: Song[] = [
    {
        id: 1,
        name: 'Thunder',
        author: 'Imagine Dragons',
        image:
            'https://www.atelevisao.com/wp-content/uploads/2018/02/Imagine-Dragons-642x556.jpg',
        path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        id: 2,
        name: 'Believer',
        author: 'Imagine Dragons',
        image:
            'https://upload.wikimedia.org/wikipedia/en/f/f4/Imagine_Dragons_Believer.jpg',
        path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
];

const MusicPlayerFooter: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.useRef<HTMLAudioElement>(null);

    const currentSong = songs[currentIndex];

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

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [currentIndex]);

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
        setIsPlaying(!isPlaying);
    };

    const nextSong = () => {
        const nextIndex = (currentIndex + 1) % songs.length;
        setCurrentIndex(nextIndex);
        setIsPlaying(false);
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }, 100);
    };

    const prevSong = () => {
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        setCurrentIndex(prevIndex);
        setIsPlaying(false);
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }, 100);
    };

    const downloadSong = () => {
        const link = document.createElement('a');
        link.href = currentSong.path;
        link.download = `${currentSong.name}.mp3`;
        link.click();
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
                    background: `url(${currentSong.image})`,
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
                            backgroundImage: `url(${currentSong.image})`,
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
                    style={{ flex: 1, margin: '0 24px'}}
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
