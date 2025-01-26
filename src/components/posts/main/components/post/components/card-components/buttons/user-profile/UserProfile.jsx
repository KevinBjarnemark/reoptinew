import { useContext } from 'react';
import style from './UserProfile.module.css';
import defaultAvatarImage from '@images/user/default-avatar.webp';
import { Link } from 'react-router-dom';
import useNeutralizeApp from '@use-neutralize-app';
import PostContext from '@post-context';

const ProfileImage = ({ src }) => {
    return (
        <div
            className={
                'flex-column-relative' + ' ' + style['profile-image-container']
            }
        >
            <img
                className={`flex-column-relative ${style['profile-image']}`}
                // Fallback to default image
                src={src ? src : defaultAvatarImage}
                alt="Profile image"
            />
        </div>
    );
};

const UserProfile = ({ image, username }) => {
    const { neutralizeApp } = useNeutralizeApp();
    const { handleClosePost } = useContext(PostContext);

    return (
        <Link
            className={`flex-row-absolute ${style['user-profile']}`}
            onClick={() => {
                neutralizeApp();
                handleClosePost();
            }}
            to={`/profile/${username}`}
        >
            <ProfileImage src={image} />
            <p className={`flex-column-absolute`}>{username}</p>
        </Link>
    );
};

export default UserProfile;
