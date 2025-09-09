import React, { useEffect } from 'react';
import { getFollowedAlbums } from '../api/userApi.ts';
import { MusicCardProps } from '../components/custom/musicCard/MusicCard.tsx';
import MusicCardTable from '../components/custom/musicCard/MusicCardTable.tsx';
import './MyPlaylistsPage.css';
import { Row, Col, Splitter } from 'antd';
import UserSidebar from '../components/userSideBar/UserSideBar.tsx';
import MusicPlayerFooter from '../components/player/musicPlayerFooter/MusicPlayerFooter.tsx';
import PageHeader from '../components/layout/PageHeader.tsx';

const MyAlbumsPage: React.FC = () => {
    const [userSideBarCollapsed, setUserSidebarCollapsed] = React.useState(false);
    const [sizes, setSizes] = React.useState(['20%', '80%']);
    const fetchAlbums = async (page: number, pageSize: number) => {
        var items: MusicCardProps[] = [];
        try {
            const albums = await getFollowedAlbums(page, pageSize);
            for (let i = 0; i < albums.length; i++) {
                items.push({
                    id: albums[i].id,
                    title: albums[i].name,
                    description: albums[i].description,
                    image: albums[i].image.url,
                    type: 'album',
                });
            }
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
        return items;
    };

    useEffect(() => {
        if (typeof sizes[0] === "number" && sizes[0] <= 100) {
            setUserSidebarCollapsed(true);
        } else {
            setUserSidebarCollapsed(false);
        }
    }, [sizes]);

    return (
        <div
            className="my-grid-container"
            style={{
                width: '100%',
                height: '100vh',
                maxHeight: '100vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                background: '#001529',
                color: '#b3b3b3',
            }}
        >
            <Row>
                <Col span={24}>
                    <PageHeader />
                </Col>
            </Row>
            <Row
                justify="start"
                style={{
                    flex: 1,
                    overflow: 'hidden',
                    padding: '16px',
                    height: '0',
                }}
                gutter={[16, 24]}
            >
                <Col span={24} style={{ height: '100%' }}>
                    <Splitter style={{ gap: 5, height: "100%" }} onResize={setSizes}>
                        <Splitter.Panel defaultSize="20%" min="5%" max="40%">
                            <UserSidebar collapsed={userSideBarCollapsed} />
                        </Splitter.Panel>
                        <Splitter.Panel style={{ height: "100%" }}>
                            <MusicCardTable fetchItems={fetchAlbums} title="My Albums" />
                        </Splitter.Panel>
                    </Splitter>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <MusicPlayerFooter />
                </Col>
            </Row>
        </div>
    );
};

export default MyAlbumsPage;
