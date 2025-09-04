import React from 'react';
import './Home.css';
import {Divider} from "antd";
import {HorizontalCardScroll, } from '../custom/scroll/horizontalScroll/HorizontalCardScroll.tsx';
import { MusicCardProps } from "../custom/musicCard/MusicCard";
import { getRecommendedPlaylists } from '../../api/recommendationApi.ts';

const HomeContent: React.FC = () => {
	const fetchPlaylists = async (page: number, pageSize: number) => {
		var items: MusicCardProps[] = [];

		try {
			const playlists = await getRecommendedPlaylists(page, pageSize);
			for (let i = 0; i < playlists.length; i++) {
				items.push({
					id: playlists[i].id,
					title: playlists[i].name,
					description: playlists[i].description,
					image: playlists[i].image.url,
				});
			}
		} catch (error) {
			console.error('Error fetching playlists:', error);
		}
		return items;
	}
	
	return (
		<div className="spotify-home-container">
			<header className="spotify-hero">
				<p>Enjoy your favorite music, playlists, and more.</p>
			</header>
			<Divider className="home-scroll-divider" orientation="start" orientationMargin="0">Daily Mix</Divider>
			<div>
				<HorizontalCardScroll fetchItems={fetchPlaylists} />
			</div>
			{/* <Divider style={{ borderColor: '#7cb305' }}>Solid</Divider>
			<p>
				<HorizontalCardScroll fetchItems={fetchPlaylists} />
			</p> */}
		</div>
	);
};

export default HomeContent;

