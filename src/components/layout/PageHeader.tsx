import React, { useEffect } from 'react';
import { Avatar, Input, Typography } from 'antd';
import { SearchOutlined, LeftOutlined } from '@ant-design/icons';
import './PageHeader.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { fetchUser } from '../../store/userSlice.ts';
import { ProPageHeader } from '@ant-design/pro-layout';
import { searchAll, setQuery } from '../../store/searchSlice.ts';

import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const PageHeader: React.FC<{ title?: string; onSearch?: (value: string) => void }> = ({ title = '', onSearch }) => {
    const dispatch = useAppDispatch();
    const { user, loading } = useAppSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);


    const handleSearch = (value) => {
        dispatch(setQuery(value));
        dispatch(searchAll(value));
        navigate('/search');
    };

    return (
        <ProPageHeader
            title={title}
            prefixedClassName="page-header"
            ghost={true}
            onBack={() => window.history.back()}
            style={{ padding: '0 16px', background: 'transparent' }}
            backIcon={<LeftOutlined style={{ color: 'rgba(255,255,255,0.55)', fontSize: '20px' }} size={30} />}
            extra={[
                <Input
                    className="page-header-search"
                    placeholder="Search for songs, artists, albums..."
                    prefix={<SearchOutlined style={{ color: 'rgba(255,255,255,0.55)', fontSize: '20px' }} />}
                    suffix={null}
                    onPressEnter={e => handleSearch((e.target as HTMLInputElement).value)}
                    allowClear
                />,
                <Avatar src={user?.images[0]} style={{
                    border: '4px solid rgba(255,255,255,0.1)',
                }} />
            ]}
        >
        </ProPageHeader>
    );
};

export default PageHeader;
