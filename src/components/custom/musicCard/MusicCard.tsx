import React, { useState } from "react";
import { Card } from "antd";
import { PlayCircleOutlined } from '@ant-design/icons';
import { getAuthorTopSongs } from '../../../api/authorApi.ts';
import { getAlbumSongs, getPlaylistSongs } from '../../../api/musicApi.ts';
import { useAppDispatch } from '../../../store/hooks.ts';
import { setSongs, setCurrentIndex, setIsPlaying } from '../../../store/playerSlice.ts';

import "./MusicCard.css";
const { Meta } = Card;

export interface MusicCardProps {
    id: string;
    title: string;
    description?: string;
    image: string;
    onPlay?: () => void;
    onOpen?: () => void;
    type: 'song' | 'album' | 'playlist' | 'author'; // Optional for styling/logic
}

export const MusicCard: React.FC<MusicCardProps> = (props) => {
    const [hovered, setHovered] = useState(false);
    const dispatch = useAppDispatch();

    const handlePlay = async () => {
        let songs: any[] = [];
        if (props.type === 'author' && props.id) {
            songs = await getAuthorTopSongs(props.id);
        } else if (props.type === 'album' && props.id) {
            songs = await getAlbumSongs(props.id);
        } else if (props.type === 'playlist' && props.id) {
            songs = await getPlaylistSongs(props.id);
        }
        if (songs.length > 0) {
            dispatch(setSongs(songs));
            dispatch(setCurrentIndex(0));
            dispatch(setIsPlaying(true));
        } else if (props.onPlay) {
            props.onPlay();
        }
    };

    return (
        <Card
            key={props.id}
            hoverable
            bordered={false}
            className="custom-card"
            bodyStyle={{ padding: "4px 8px" }} 
            style={{ width: 150, position: 'relative', borderRadius: "10px" }}
            cover={
                <div style={{ position: 'relative' }}>
                    <img alt={props.title} src={props.image}  style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: "10px" }} />
                    {hovered && (
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            gap: 16,
                            zIndex: 2,
                        }}>
                            <PlayCircleOutlined
                                style={{ fontSize: 40, color: '#fff', cursor: 'pointer', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}
                                onClick={e => { e.stopPropagation(); handlePlay(); }}
                            />
                        </div>
                    )}
                </div>
            }
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={props.onOpen}
        >
            <Meta title={props.title} description={props.description}  style={{ padding: 5, color: '#fff' }} />
        </Card>
    );
};
