import React, { useState } from "react";
import { Card } from "antd";
import { PlayCircleOutlined, FolderOpenOutlined } from '@ant-design/icons';

import "./MusicCard.css";
const { Meta } = Card;

export interface MusicCardProps {
    id?: string;
    title: string;
    description?: string;
    image: string;
    onPlay?: () => void;
    onOpen?: () => void;
    type?: 'song' | 'album' | 'playlist'; // Optional for styling/logic
}

export const MusicCard: React.FC<MusicCardProps> = (props) => {
    const [hovered, setHovered] = useState(false);

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
                            {props.onPlay && (
                                <PlayCircleOutlined
                                    style={{ fontSize: 40, color: '#fff', cursor: 'pointer', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}
                                    onClick={e => { e.stopPropagation(); props.onPlay && props.onPlay(); }}
                                />
                            )}
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
