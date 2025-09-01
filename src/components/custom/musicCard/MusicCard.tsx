import React, { useState, useEffect } from "react";
import { PlayCircleOutlined } from '@ant-design/icons';
import { Card, Spin } from "antd";

const { Meta } = Card;

interface CardProps {
    id ?: number;
    title: string;
    description?: string;
    image: string;
    onClick ?: () => void;
}

const MusicCard: React.FC<CardProps> = (props: CardProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Card
            key={props.id}
            hoverable
            style={{ width: 200, position: 'relative' }}
            cover={
                <div style={{ position: 'relative' }}>
                    <img alt={props.title} src={props.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    {hovered && (
                        <PlayCircleOutlined
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: 48,
                                color: '#fff',
                                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                                cursor: 'pointer',
                                zIndex: 2,
                            }}
                            onClick={props.onClick}
                        />
                    )}
                </div>
            }
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Meta title={props.title} description={props.description} />
        </Card>
    );
};

export default MusicCard;
