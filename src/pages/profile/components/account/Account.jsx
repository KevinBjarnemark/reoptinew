import { useState, useEffect } from 'react';
import style from './Account.module.css';
import defaultAvatarImage from '@default-avatar-image';
import DeleteAccount from '../delete-account/DeleteAccount';
import { useParams } from 'react-router-dom';
import { debug } from '@debug';
import useAPI from '@use-api';

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
    const showDebugging = true;
    const { identifier } = useParams();
    const { apiRequest } = useAPI(showDebugging);
    const [userProfile, setUserProfile] = useState(null);

    const loadUserProfileByIdentifier = async (identifier) => {
        // Fetch a user's profile by identifier (id or username)
        debug(showDebugging, 'Fetching the user profile', '');
        const response = await apiRequest({
            relativeURL: `/users/profile/${identifier}`,
            authorizationHeader: false,
            method: 'GET',
            debugMessages: {
                backendError: 'Failed fetching user profile (backend)',
                frontendError: 'Failed fetching user profile (frontend)',
                successfulBackEndResponse: 'Fetched user profile successfully',
            },
        });
        if (response) {
            debug(showDebugging, `Loaded user by ${identifier}`, response);
            setUserProfile(response);
        } else {
            debug(
                showDebugging,
                "Couldn't get the user profile by id",
                response,
            );
        }
    };

    useEffect(() => {
        if (identifier) {
            loadUserProfileByIdentifier(identifier);
        }
    }, [identifier]);

    return (
        <div className={'flex-row-relative w-100 ' + `${style.container}`}>
            <h5 className={`${style['title']} mt-3`}>Profile</h5>
            <ProfileImage src={userProfile?.image} />
            <p className="text-white">{userProfile?.username}</p>
            <DeleteAccount />
        </div>
    );
};

export default Account;
