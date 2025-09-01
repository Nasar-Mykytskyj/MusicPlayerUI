import React from 'react';
import { Flex, Layout } from 'antd';
import UserSidebar from '../components/userSideBar/UserSideBar.tsx';
import MusicPlayerFooter from '../components/player/musicPlayerFooter/MusicPlayerFooter.tsx'
import HomeContent from '../components/home/Home.tsx';

const { Content } = Layout;

const Home = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Flex style={{width:'100%', height: '90vh'}}>
                <UserSidebar />
                <Layout>
                        <HomeContent />
                </Layout>
            </Flex>
            <div className='music-footer-wrapper' style={{height: '10vh'}}>
                <MusicPlayerFooter></MusicPlayerFooter>
            </div>
        </Layout>
    );
};

export default Home;
