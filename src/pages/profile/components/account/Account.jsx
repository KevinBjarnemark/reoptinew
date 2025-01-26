import { useState, useEffect } from 'react';
import style from './Account.module.css';
import defaultAvatarImage from '@images/user/default-avatar.webp';
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

    useEffect(() => {
        const loadUserProfileByIdentifier = async (identifier) => {
            // Fetch a user's profile by identifier (id or username)
            debug(showDebugging, 'Fetching the user profile', '');
            const response = await apiRequest({
                relativeURL: `/users/profile/${identifier}`,
                authorizationHeader: false,
                method: 'GET',
                debugMessages: {
                    error: 'Error when fetching user profile',
                    successfulBackEndResponse:
                        'Fetched user profile successfully',
                },
                uxMessages: {
                    error:
                        "Couldn't load this user's profile. " +
                        'Please refresh your browser.',
                },
            });
            if (response) {
                debug(showDebugging, `Loaded user (${identifier})`, response);
                setUserProfile(response);
            } else {
                debug(
                    showDebugging,
                    "Couldn't get the user profile by id",
                    response,
                );
            }
        };

        if (identifier) {
            loadUserProfileByIdentifier(identifier);
        }

        // apiRequest is in itself not a dependency,
        // but since it's imported from a context, ES Lint is flagging
        // it as one unnecessarily. showDebugging is also excluded as it
        // doesn't change.
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
