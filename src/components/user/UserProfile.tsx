import React from 'react';
import './UserProfile.css';

interface UserImage {
  Url: string;
}

interface User {
  Name: string;
  Email: string;
  Images: UserImage[];
}

interface UserProfileProps {
  user: User;
}

const defaultImage =
  'http://thumbs.dreamstime.com/b/person-icon-black-background-person-solid-vector-eps-90447225.jpg';

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const hasImages = user.Images && user.Images.length > 0;
  const imageUrl = hasImages ? user.Images[0].Url : defaultImage;

  return (
    <div className="user-profile">
        <div
        className="user-background"
        style={{ background: `url('${imageUrl}')`, backgroundSize: 'cover' }}
        ></div>
        <div className="user-image">
        <img src={imageUrl} alt="User avatar" />
        </div>
        <div className="user-info">
        <p className="user-name">{user.Name}</p>
        <p className="user-email">{user.Email}</p>
        </div>
    </div>
  );
};
