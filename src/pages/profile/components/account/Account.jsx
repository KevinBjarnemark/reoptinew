import { useState, useEffect, useContext } from 'react';
import style from './Account.module.css';
import profileImageStyle from './ProfileImage.module.css';
import defaultAvatarImage from '@images/user/default-avatar.webp';
import DeleteAccount from '../delete-account/DeleteAccount';
import { useParams } from 'react-router-dom';
import { debug } from '@debug';
import useAPI from '@use-api';
import UserContext from '../../../../context/UserContext';
import Image from '@image';
import useLoadImage from '@use-load-image';
import NotificationContext from '@notification-context';

const Account = () => {
    const showDebugging = true;
    const { identifier } = useParams();
    const { apiRequest } = useAPI(showDebugging);
    const [userProfile, setUserProfile] = useState(null);
    const { isAuthenticated, profile } = useContext(UserContext);
    const { loadImage } = useLoadImage(true);
    const { addNotification } = useContext(NotificationContext);
    const isOwnProfile = userProfile?.user_id === profile?.user_id;
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const loadUserProfileByIdentifier = async (identifier) => {
            // Fetch a user's profile by identifier (id or username)
            debug('d', showDebugging, 'Fetching the user profile.', '');
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
                debug(
                    's',
                    showDebugging,
                    `Loaded user (${identifier}):`,
                    response,
                );
                setUserProfile(response);
            } else {
                debug(
                    'e',
                    showDebugging,
                    "Couldn't get the user profile by id:",
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

    useEffect(() => {
        if (isOwnProfile && profile?.image) {
            setPreviewImage(profile.image);
        }
    }, [profile]);

    const validateForm = () => {
        return true;
    };

    const updateImage = async (e) => {
        const init = async () => {
            const loadedImage = loadImage(e);
            if (loadedImage) {
                setPreviewImage(loadedImage.url);
                const response = await apiRequest({
                    method: 'PATCH',
                    authorizationHeader: true,
                    validateForm,
                    formDataDraft: { image: loadedImage.file },
                    relativeURL: '/users/profile/update-image/',
                    debugMessages: {
                        error: "Couldn't update user's profile image",
                        successfulBackEndResponse:
                            'Profile image update successful',
                    },
                    uxMessages: {
                        error:
                            "Couldn't update your profile image, try " +
                            'refreshing your browser.',
                    },
                });
                if (response) {
                    debug(
                        's',
                        showDebugging,
                        'Profile update successful:',
                        response,
                    );
                    await addNotification(true, 'Image updated!');
                } else {
                    await addNotification(
                        false,
                        "Couldn't update your image :(",
                    );
                }
            }
        };
        await init();
    };

    const imageProps = {
        editMode: isAuthenticated,
        defaultImage: isAuthenticated ? previewImage : defaultAvatarImage,
        image: {
            src: isAuthenticated ? previewImage : userProfile?.image,
        },
        inputProps: {
            id: 'Account-page-profile-image',
            onChange: updateImage,
        },
        previewImg: isAuthenticated ? previewImage : null,
        customStyle: profileImageStyle,
    };

    return (
        <div className={'flex-row-relative w-100 ' + `${style.container}`}>
            <h5 className={`${style['title']} mt-3`}>Profile</h5>
            <Image {...imageProps} />
            <p className="text-white">{userProfile?.username}</p>
            <DeleteAccount />
        </div>
    );
};

export default Account;
