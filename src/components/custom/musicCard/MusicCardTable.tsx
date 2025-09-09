import React, { useState, useEffect } from "react";

import { MusicCard, MusicCardProps } from './MusicCard.tsx';
import './MusicCardTable.css';

interface MusicCardTableProps {
    fetchItems: (page: number, pageSize: number) => Promise<MusicCardProps[]>;
    title?: string;
}


const MusicCardTable: React.FC<MusicCardTableProps> = ({ fetchItems, title }) => {
    const [items, setItems] = useState<MusicCardProps[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    useEffect (() => {
        loadMoreData();
        console.log('i fire once');
    }, [])

    useEffect(() => {
        // Attach scroll listener
        const wrapper = wrapperRef.current;
        if (wrapper) {
            wrapper.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (wrapper) {
                wrapper.removeEventListener('scroll', handleScroll);
            }
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // Clean up scroll listener if hasMore changes
        const wrapper = wrapperRef.current;
        if (wrapper && hasMore) {
            wrapper.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (wrapper) {
                wrapper.removeEventListener('scroll', handleScroll);
            }
        };
    }, [hasMore]);

    const loadMoreData = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        const newItems = await fetchItems(page, 10);
        setItems((prev) => [...prev, ...newItems]);
        setPage((prev) => prev + 1);
        if (newItems.length < 10 || page > 5) setHasMore(false); // Stop if no more items or max page
        setLoading(false);
    };

    const handleScroll = () => {
        const wrapper = wrapperRef.current;
        if (!wrapper || loading || !hasMore) return;
        const { scrollTop, scrollHeight, clientHeight } = wrapper;
        if (scrollHeight - scrollTop - clientHeight < 100) {
            //loadMoreData();
        }
    };

    return (
        <div className="music-card-table-wrapper" ref={wrapperRef} style={{ height: '500px', overflowY: 'auto' }}>
            {title && <h2 className="music-card-table-title">{title}</h2>}
            <div className="music-card-table-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", // 👈 responsive grid
                    gap: "16px",
                    padding: "16px",
                }}
            >
                {items.map((item) => (
                    <MusicCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        type={item.type}
                        onPlay={item.onPlay}
                        onOpen={item.onOpen}
                    />
                ))}
            </div>
            {loading && <div style={{ textAlign: 'center', padding: '16px' }}>Loading...</div>}
        </div>
    );
};

export default MusicCardTable;
