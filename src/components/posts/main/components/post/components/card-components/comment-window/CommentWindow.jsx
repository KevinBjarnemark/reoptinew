import { useContext, useEffect } from 'react';
import style from './CommentWindow.module.css';
import BasicButton from '@basic-button';
// Contexts
import AlertContext from '@alert-context';
import NotificationContext from '@notification-context';
import GeneralLoadingContext from '@general-loading-context';
import PageDimContext from '@page-dim-context';
import CommentPostContext from '@comment-post-context';
// Custom hooks
import useAPI from '@use-api';
// Logging
import { debug } from '@debug';
import PostContext from '@post-context';
import { isObject } from '@helpers';

const Title = ({ text }) => {
    return (
        <div
            className={
                'flex-column-relative ' +
                style['title'] +
                ' ' +
                style['light-gray-background']
            }
        >
            <h6>{text}</h6>
        </div>
    );
};

const CommentsArea = ({ comments }) => {
    return (
        <div
            className={
                'flex-column-relative ' +
                style['comments-area-container'] +
                ' ' +
                style['dark-gray-background']
            }
        >
            {comments.map((comment, index) => (
                <div
                    key={index}
                    className={
                        'flex-column-relative ' +
                        style['comment-item-container']
                    }
                >
                    <div
                        className={
                            'flex-row-relative ' + style['comment-top-row']
                        }
                    >
                        <p className={style['username']}>
                            {comment?.author.username}
                        </p>
                        <p className={style['created-at']}>
                            {comment.created_at.split('T')[0] +
                                ' ' +
                                comment.created_at
                                    .split('T')[1]
                                    .split('.')[0] +
                                ' (UTC)'}
                        </p>
                    </div>
                    <div className={'flex-row-relative ' + style['comment']}>
                        <p className={style['comment']}>{comment.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const WriteCommentArea = () => {
    const { setComment } = useContext(CommentPostContext);

    return (
        <div
            className={
                'flex-column-relative ' + style['write-comment-area-container']
            }
        >
            <textarea
                className={'flex-column-relative ' + style['textarea']}
                name="comment"
                type="text"
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
        </div>
    );
};

const CommentWindow = () => {
    const showDebugging = true;
    const { setDim } = useContext(PageDimContext);
    const { loadSinglePost, singlePost } = useContext(PostContext);
    const { show, closeCommentWindow, postId, comment, comments } =
        useContext(CommentPostContext);
    const { addNotification } = useContext(NotificationContext);
    const { addLoadingPoint, removeLoadingPoint } = useContext(
        GeneralLoadingContext,
    );
    // Custom hooks
    const { addAlert } = useContext(AlertContext);
    const { apiRequest } = useAPI(true);

    useEffect(() => {
        if (show) {
            setDim(true);
        } else if (!isObject(singlePost, true)) {
            setDim(false);
        }
    }, [show, singlePost]);

    const handleClose = () => {
        closeCommentWindow();
    };

    const handleSubmit = async () => {
        const init = async () => {
            addLoadingPoint();
            try {
                const response = await apiRequest({
                    authorizationHeader: true,
                    body: { text: comment },
                    relativeURL: `/posts/comments/${postId}/`,
                    debugMessages: {
                        error: "Couln't submit comment",
                        successfulBackEndResponse:
                            'Created comment successfully',
                    },
                    uxMessages: {
                        error: "Couldn't submit comment",
                    },
                });

                if (response) {
                    debug(
                        's',
                        showDebugging,
                        'Submitted comment successfully',
                        response,
                    );
                    if (isObject(singlePost, true)) {
                        loadSinglePost(postId);
                    }
                    closeCommentWindow();
                    addAlert('Your comment is submitted.', 'Done');
                    await addNotification(true, 'Comment submitted!');
                } else {
                    debug(
                        'e',
                        showDebugging,
                        "Couldn't submit comment (backend):",
                        response,
                    );
                    await addNotification(false, "Couldn't submit comment :(");
                }
            } catch (error) {
                addAlert(
                    'Hmm, something went wrong. Try refreshing your browser.',
                    'Error',
                );
                debug(
                    'e',
                    showDebugging,
                    '(Frontend) Something went wrong when  ' +
                        'submitting a comment',
                    error,
                );
            } finally {
                removeLoadingPoint();
            }
        };

        await init();
    };

    if (show) {
        return (
            <section className={'flex-column-fixed ' + `${style.container}`}>
                <div
                    className={
                        'flex-column-relative ' + `${style['inner-container']}`
                    }
                >
                    <BasicButton
                        text={'X'}
                        buttonProps={{
                            onClick: handleClose,
                            className:
                                'flex-column-fixed ' +
                                `${style['close-button']}`,
                        }}
                    />
                    <div
                        className={
                            'flex-column-relative ' +
                            style['content-container']
                        }
                    >
                        <div
                            className={
                                'flex-column-relative ' +
                                style['comments-container']
                            }
                        >
                            <Title text="Comments" />

                            <CommentsArea {...{ comments }} />
                            <WriteCommentArea />
                        </div>

                        <div
                            className={
                                'flex-column-relative ' +
                                style['submit-button-container']
                            }
                        >
                            <button
                                className={
                                    'flex-column-relative ' +
                                    style['submit-button']
                                }
                                onClick={handleSubmit}
                            >
                                Publish comment
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default CommentWindow;
