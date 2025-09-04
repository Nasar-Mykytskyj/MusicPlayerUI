import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import { MusicCardProps, MusicCard } from "../../musicCard/MusicCard.tsx";
import { PlayCircleFilled, LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./HorizontalCardScroll.css";

export interface HorizontalCardScrollProps {
  fetchItems: (page: number, pageSize: number) => Promise<MusicCardProps[]>;
}

export const HorizontalCardScroll: React.FC<HorizontalCardScrollProps> = ({ fetchItems }) => {
  const [items, setItems] = useState<MusicCardProps[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = async () => {
    var newItems = await fetchItems(page, 10);
    setItems((prev) => [...prev, ...newItems]);
    setPage((prev) => prev + 1);
    if (page > 5) setHasMore(false); //
  };

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="horizontal-scroll-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <button
        className={`scroll-btn left ${isHovered ? "" : "hidden"}`}
        onClick={() => scrollBy(-300)}
        aria-label="Scroll left"
      >
        <LeftOutlined />
      </button>
      <div
        id="scrollableDiv"
        className="horizontal-scroll"
        ref={scrollRef}
      >
        <InfiniteScroll
          dataLength={items.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<Spin />}
          endMessage={<p style={{ textAlign: "center" }}>No more songs 🎶</p>}
          scrollableTarget="scrollableDiv"
          style={{ overflowY: "hidden" }}
          horizontal
        >
          <div style={{ display: "flex", gap: "16px" }}>
            {items.map((item) => (
              <MusicCard
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                onPlay={item.onPlay}
                onOpen={item.onOpen}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <button
        className={`scroll-btn right ${isHovered ? "" : "hidden"}`}
        onClick={() => scrollBy(300)}
        aria-label="Scroll right"
      >
        <RightOutlined />
      </button>
    </div>
  );
};

export default HorizontalCardScroll;