import { useState, useContext } from 'react';
import style from './EngagementPanel.module.css';
import useAPI from '@use-api';
import { debug } from '@debug';
import PostContext from '@post-context';
import AlertContext from '@alert-context';
import RatingPostContext from '@rate-post-context';
import CommentPostContext from '@comment-post-context';
import { POST_UNIQUE_ID_CREATE } from '@constants';

const RatingProgressBar = (props) => {
    const { icon, initialValue } = props;

    return (
        <div className={`flex-row-relative ${style['ratings-container']}`}>
            <div
                className={
                    'flex-column-relative ' +
                    `${style['rating-icon-container']}`
                }
            >
                <div className={`flex-column ${style['rating-icon']}`}>
                    <i className={icon}></i>
                </div>
            </div>

            <div
                className={
                    'flex-column-relative ' +
                    `${style['rating-bar-container']}`
                }
            >
                <div className={`flex-column-relative ${style['rating-bar']}`}>
                    <div
                        className={
                            'flex-column-relative ' +
                            `${style['rating-bar-filled']}`
                        }
                        style={{ width: `${initialValue}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

const RatingsButton = (props) => {
    const { postId, ratings } = props;
    const { openRatingWindow } = useContext(RatingPostContext);
    const { addAlert } = useContext(AlertContext);

    return (
        <button
            className="flex-column-relative"
            style={{
                width: '100%',
            }}
            onClick={() => {
                if (postId === POST_UNIQUE_ID_CREATE) {
                    addAlert('You cannot rate a post in create mode.', 'Info');
                } else {
                    openRatingWindow(postId, ratings);
                }
            }}
        >
            <RatingProgressBar
                {...{
                    icon: 'fa-solid fa-dollar-sign',
                    initialValue: ratings.saves_money,
                }}
            />
            <RatingProgressBar
                {...{
                    icon: 'fa-regular fa-clock',
                    initialValue: ratings.saves_time,
                }}
            />
            <RatingProgressBar
                {...{
                    icon: 'fa-solid fa-hand-fist',
                    initialValue: ratings.is_useful,
                }}
            />
        </button>
    );
};

const CommentButton = (props) => {
    const { comments, postId } = props;
    const { openCommentWindow } = useContext(CommentPostContext);
    const { addAlert } = useContext(AlertContext);

    return (
        <button
            className={
                'flex-column-relative ' + `${style['engage-button-container']}`
            }
            onClick={() => {
                if (postId === POST_UNIQUE_ID_CREATE) {
                    addAlert(
                        'You cannot comment on a post in create mode.',
                        'Info',
                    );
                } else {
                    openCommentWindow(postId, comments);
                }
            }}
        >
            <i className="fa-solid fa-comment"></i>
            <p className="flex-column-absolute">{comments.length}</p>
        </button>
    );
};

const LikeButton = (props) => {
    const {
        postId = null,
        likes = { count: 0, user_has_liked: false },
        editMode,
    } = props;
    const { updateLikes } = useContext(PostContext);
    const { addAlert } = useContext(AlertContext);
    const showDebugging = true;
    const { apiRequest } = useAPI(true);
    const [userHasLiked, setUserHasLiked] = useState(likes?.user_has_liked);
    const [likeCount, setLikeCount] = useState(likes?.count);

    const like = async () => {
        if (editMode) {
            addAlert('You cannot like this post in edit mode.', 'Info');
            return;
        }
        const response = await apiRequest({
            method: userHasLiked ? 'DELETE' : 'POST',
            authorizationHeader: true,
            relativeURL: `/posts/like/${postId}/`,
            debugMessages: {
                error:
                    'Error when attempting to ' + userHasLiked
                        ? 'remove like from'
                        : 'like' + ' post',
                successfulBackEndResponse: userHasLiked
                    ? 'removed like from'
                    : 'liked' + ' post',
            },
            uxMessages: {
                error:
                    "Couldn't " + userHasLiked
                        ? 'remove this like from'
                        : 'like this a' + 'post, please try again.',
            },
        });

        if (response) {
            debug(
                's',
                showDebugging,
                'User successfully ' + userHasLiked
                    ? 'removed a like from a post'
                    : 'liked a post:',
                `postId = ${postId}`,
            );
            setUserHasLiked((prev) => !prev);
            setLikeCount((prev) => (userHasLiked ? prev - 1 : prev + 1));
            updateLikes(postId, userHasLiked ? -1 : 1);
        }
    };

    return (
        <button
            className={
                'flex-column-relative ' + `${style['engage-button-container']}`
            }
            onClick={like}
        >
            <i
                className="fa-solid fa-heart"
                style={{
                    color: userHasLiked ? 'rgb(255, 113, 113)' : 'var(--gray)',
                }}
            ></i>
            <p className="flex-column-absolute">{likeCount}</p>
        </button>
    );
};

const EngageButtons = ({ postId, likes, comments, editMode }) => {
    return (
        <div
            className={
                'flex-row-relative ' + `${style['engage-buttons-container']}`
            }
        >
            <LikeButton {...{ postId, likes, editMode }} />

            <div className={style['vertical-separator']}></div>
            <CommentButton
                {...{
                    postId,
                    comments,
                }}
            />
        </div>
    );
};

const EngagementPanel = (props) => {
    const {
        ratings,
        postId,
        likes = { count: 0, user_has_liked: false },
        editMode,
        comments,
    } = props;

    return (
        <div className={`flex-column-relative ${style.container}`}>
            <div className={style['horizontal-separator']}></div>
            <RatingsButton {...{ ratings, postId }} />
            <div className={style['horizontal-separator']}></div>
            <EngageButtons {...{ postId, likes, comments, editMode }} />
            <div className={style['horizontal-separator']}></div>
        </div>
    );
};

export default EngagementPanel;
