import React from 'react';
import './Home.css';
import {Divider} from "antd";
import {HorizontalCardScroll, } from '../custom/scroll/horizontalScroll/HorizontalCardScroll.tsx';
import { MusicCardProps } from "../custom/musicCard/MusicCard";
import { getRecommendedPlaylists, getRecommendedAuthors } from '../../api/recommendationApi.ts';

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
					type: 'playlist',
				});
			}
		} catch (error) {
			console.error('Error fetching playlists:', error);
		}
		return items;
	}

	const fetchAuthors = async (page: number, pageSize: number) => {
		var items: MusicCardProps[] = [];

		try {
			const authors = await getRecommendedAuthors(page, pageSize);
			for (let i = 0; i < authors.length; i++) {
				items.push({
					id: authors[i].id,
					title: authors[i].name,
					description: authors[i].description,
					image: authors[i].image.url,
					type: 'author',
				});
			}
			
		} catch (error) {
			console.error('Error fetching authors:', error);
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
			<Divider className="home-scroll-divider" orientation="start" orientationMargin="0">Authors for you</Divider>
			<div>
				<HorizontalCardScroll fetchItems={fetchAuthors} />
			</div>
			<Divider className="home-scroll-divider" orientation="start" orientationMargin="0">Authors for you</Divider>
			<div>
				<HorizontalCardScroll fetchItems={fetchAuthors} />
			</div>
		</div>
	);
};

export default HomeContent;

