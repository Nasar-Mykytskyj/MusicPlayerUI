import React from 'react';
import { Button, Card, Typography } from 'antd';
import { SpotifyOutlined } from '@ant-design/icons'; // optional custom icon
import './Login.css'; // optional for styling
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleSpotifyLogin = () => {
    // const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
    // const redirectUri = 'http://localhost:3000/callback';
    // const scope = 'user-read-private user-read-email';
    // const authEndpoint = 'https://accounts.spotify.com/authorize';

    // const url = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    //   redirectUri
    // )}&scope=${encodeURIComponent(scope)}&response_type=token&show_dialog=true`;

    // window.location.href = url;
    //"http://127.0.0.1:8084/spotify/login"
    const fetchData = async () => {
      try {
        const redirectUri = `${window.location.origin}/home`;
        const response = await fetch(`spotify/init/login?redirect_url=${encodeURIComponent(redirectUri)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch auth URL');
        }

        const data = await response.json();
        if (data.authURL) {
          const url = new URL(data.authURL);
          window.location.href = url.toString(); // Redirect to the Spotify login URL
        } else {
          console.error('authURL not found in response');
        }
      } catch (error) {
        console.error('Error fetching auth URL:', error);
      }
    };

    fetchData();
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={2}>Login with Spotify</Title>
        <Button
          type="primary"
          icon={<SpotifyOutlined />}
          size="large"
          onClick={handleSpotifyLogin}
        >
          Connect to Spotify
        </Button>
      </Card>
    </div>
  );
};

export default Login;
