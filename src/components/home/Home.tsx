import React from 'react';
import './Home.css';

const mockPlaylists = [
	{
		id: 1,
		name: 'Top Hits 2025',
		description: 'The hottest tracks of the year',
		image: 'https://i.scdn.co/image/ab67706f00000002b1e8e7e2e2e2e2e2e2e2e2e2',
	},
	{
		id: 2,
		name: 'Chill Vibes',
		description: 'Relax and unwind with these chill tunes',
		image: 'https://i.scdn.co/image/ab67706f00000002c2e8e7e2e2e2e2e2e2e2e2e2',
	},
	{
		id: 3,
		name: 'Workout Mix',
		description: 'Get pumped with this energetic playlist',
		image: 'https://i.scdn.co/image/ab67706f00000002d3e8e7e2e2e2e2e2e2e2e2e2',
	},
	{
		id: 4,
		name: 'Focus Flow',
		description: 'Stay productive with these tracks',
		image: 'https://i.scdn.co/image/ab67706f00000002e4e8e7e2e2e2e2e2e2e2e2e2',
	},
];

const HomeContent: React.FC = () => {
	return (
		<div className="spotify-home-container">
			<header className="spotify-hero">
				<h1>Welcome back!</h1>
				<p>Enjoy your favorite music, playlists, and more.</p>
			</header>
			<section className="spotify-section">
				<h2>Featured Playlists</h2>
				<div className="spotify-playlists-grid">
					{mockPlaylists.map((playlist) => (
						<div className="spotify-playlist-card" key={playlist.id}>
							<img src={playlist.image} alt={playlist.name} />
							<div className="playlist-info">
								<h3>{playlist.name}</h3>
								<p>{playlist.description}</p>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default HomeContent;

