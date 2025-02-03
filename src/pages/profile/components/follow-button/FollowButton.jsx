import { useContext, useState, useEffect } from 'react';
import style from './FollowButton.module.css';
import UserContext from '../../../../context/UserContext';
import BasicButton from '@basic-button';
import { useLocation } from 'react-router';

const FollowButton = (props) => {
    const { userProfile, setUserProfile, isOwnProfile } = props;
    const { handleFollow, profile, setProfile } = useContext(UserContext);
    const [buttonText, setButtonText] = useState('Follow');
    const url = useLocation();

    useEffect(() => {
        if (profile?.following?.includes(userProfile?.username)) {
            setButtonText('Unfollow');
        }
    }, [userProfile, profile, url]);

    const handleClick = () => {
        if (buttonText === 'Follow') {
            handleFollow('follow', userProfile.user_id);
            setUserProfile((prev) => ({
                ...prev,
                followers: [...prev.followers, profile.username],
            }));
            setProfile((prev) => ({
                ...prev,
                following: [...prev.following, userProfile.username],
            }));
            setButtonText('Unfollow');
        } else if (buttonText === 'Unfollow') {
            handleFollow('unfollow', userProfile.user_id);
            setUserProfile((prev) => ({
                ...prev,
                followers: prev.followers.filter(
                    (username) => username !== profile.username,
                ),
            }));
            setProfile((prev) => ({
                ...prev,
                following: prev.following.filter(
                    (username) => username !== userProfile.username,
                ),
            }));
            setButtonText('Follow');
        }
    };

    if (!isOwnProfile) {
        return (
            <BasicButton
                text={buttonText}
                buttonProps={{
                    className:
                        'flex-column-absolute ' + `${style['follow-button']}`,
                    style: {
                        backgroundColor:
                            buttonText === 'Follow'
                                ? 'rgb(123, 171, 182)'
                                : '#f39d68',
                    },
                    onClick: handleClick,
                }}
            />
        );
    }
    return null;
};

export default FollowButton;
