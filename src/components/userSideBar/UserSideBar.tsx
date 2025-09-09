import React, { useState, useEffect } from 'react';
import { Menu, Avatar, Typography, Button, Flex } from 'antd';
import { RightOutlined, LeftOutlined, SettingOutlined, HeartFilled, OrderedListOutlined } from '@ant-design/icons';
import {
    FacebookFilled,
    TwitterOutlined,
    InstagramOutlined,
    PieChartOutlined,
    TeamOutlined
} from '@ant-design/icons';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import './userSideBar.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { fetchUser } from '../../store/userSlice.ts';
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface UserSidebarProps {
    collapsed?: boolean;
}

const UserSidebar: React.FC<UserSidebarProps> = () => {
    const dispatch = useAppDispatch();
    const { user, loading } = useAppSelector(state => state.user);
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);


    return (
        <Flex style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            className="user-sidebar"
        >
            <div className={`user-sidebar-content${collapsed ? ' collapsed' : ''}`}>
                <div style={{ textAlign: 'center', padding: 16 }}>
                    <div
                        style={{
                            background: `url(${user?.images[0]})`,
                            backgroundSize: 'cover',
                            filter: 'blur(25px)',
                            height: 100,
                            borderRadius: 8,
                            marginBottom: -50,
                        }}
                    />
                    <Avatar
                        size={collapsed ? 40 : 60}
                        src={user?.images[0]}
                        style={{
                            border: '4px solid rgba(255,255,255,0.1)',
                            marginTop: -40,
                            marginBottom: 12,
                        }}
                    />
                    {!collapsed && (
                        <>
                            <Text strong style={{ display: 'block', color: '#fff' }}>
                                {user?.name}
                            </Text>
                            <Text type="secondary" style={{ fontSize: 12, color: '#ffffff99' }}>
                                {user?.email}
                            </Text>
                        </>
                    )}
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}
                    style={{ height: 'calc(100% - 200px)', borderRight: 0, background: 'transparent' }}>
                    <Menu.Item key="1" icon={<OrderedListOutlined />} className='' onClick={() => {navigate('/my-playlists')}}>
                        My Playlists
                    </Menu.Item>
                    <Menu.Item key="2" icon={<PieChartOutlined />} className='' onClick={() => {navigate('/my-albums')}}>
                        My Albums
                    </Menu.Item>
                    <Menu.Item key="3" icon={<TeamOutlined />} className='' onClick={() => {navigate('/my-artists')}}>
                        My Authors
                    </Menu.Item>
                    <Menu.Item key="4" icon={<HeartFilled />} onClick={() => { }}>
                        Favorites
                    </Menu.Item>
                    <Menu.Item key="5" icon={<SettingOutlined />} onClick={() => { }}>
                        Settings
                    </Menu.Item>
                </Menu>
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <a href="#" style={{ margin: '0 8px', color: '#fff' }}>
                        <FacebookFilled />
                    </a>
                    <a href="#" style={{ margin: '0 8px', color: '#fff' }}>
                        <TwitterOutlined />
                    </a>
                    <a href="#" style={{ margin: '0 8px', color: '#fff' }}>
                        <InstagramOutlined />
                    </a>
                </div>
            </div>

        </Flex>
    );
};

export default UserSidebar;
