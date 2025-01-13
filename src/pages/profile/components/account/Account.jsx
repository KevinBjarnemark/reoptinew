import { useContext } from 'react';
import style from './Account.module.css';
import UserContext from '../../../../context/UserContext';
import defaultAvatarImage from '@default-avatar-image';
import DeleteAccount from '../delete-account/DeleteAccount';

const ProfileImage = ({ src }) => {
    return (
        <div className={`flex-column-relative ${style['image-container']}`}>
            <img
                className={`flex-column-relative ${style['image']}`}
                // Fallback to default image
                src={src ? src : defaultAvatarImage}
                alt="Profile image"
            />
        </div>
    );
};

const Account = () => {
    const { profile } = useContext(UserContext);
    return (
        <div className={'flex-row-relative w-100 ' + `${style.container}`}>
            <h5 className={`${style['title']} mt-3`}>Profile</h5>
            <ProfileImage src={profile?.image} />
            <p className="text-white">{profile?.username}</p>
            <DeleteAccount />
        </div>
    );
};

export default Account;
