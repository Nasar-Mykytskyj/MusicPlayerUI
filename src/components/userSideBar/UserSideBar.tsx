import React, { useState,useEffect } from 'react';
import { Layout, Menu, Avatar, Typography, Button, Flex } from 'antd';
import { RightOutlined, LeftOutlined, SettingOutlined, HeartFilled, OrderedListOutlined } from '@ant-design/icons';
import {
    FacebookFilled,
    TwitterOutlined,
    InstagramOutlined,
    MenuOutlined,
} from '@ant-design/icons';

import './userSideBar.css'

const { Sider } = Layout;
const { Text } = Typography;

interface User {
  id: number;
  name: string;
  email: string;
  images: string[];
}

const UserSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState<User | null>(null);

   useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/spotify/user/info");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

    const handleClick = () => {
        setCollapsed(!collapsed)
    };

    return (
        <Flex vertical={false}>
            <Sider
                collapsible
                collapsed={collapsed}
                width={280}
                theme="dark"
                trigger={null}
                className='user-sider'
                style={{
                    paddingTop: 20,
                    position: 'relative',
                }}
            >
                {/* User Info */}
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
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                {user?.email}
                            </Text>
                        </>
                    )}
                </div>

                {/* Menu */}
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<OrderedListOutlined />} className=''>
                        My Playlists
                    </Menu.Item>
                    <Menu.Item key="2" icon={<HeartFilled />}>
                        Favorites
                    </Menu.Item>
                    <Menu.Item key="3" icon={<SettingOutlined />}>
                        Settings
                    </Menu.Item>
                </Menu>

                {/* Social Links */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 16,
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
            </Sider>
            <Button type="primary" className='toggle-button' icon={collapsed ? <RightOutlined /> : <LeftOutlined />} onClick={handleClick} />
        </Flex>
    );
};

export default UserSidebar;
