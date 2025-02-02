import { useState } from 'react';
import CommentPostContext from './CommentPostContext';

const CommentPostProvider = ({ children }) => {
    const [show, setShow] = useState(false);
    const [postId, setPostId] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const openCommentWindow = (postId, initialComments) => {
        setPostId(postId);
        setComments(initialComments);
        setShow(true);
        setComment('');
    };

    const closeCommentWindow = () => {
        setComments([]);
        setPostId(null);
        setShow(false);
        setComment('');
    };

    return (
        <CommentPostContext.Provider
            value={{
                openCommentWindow,
                closeCommentWindow,
                show,
                comments,
                setComments,
                postId,
                comment,
                setComment,
            }}
        >
            {children}
        </CommentPostContext.Provider>
    );
};

export default CommentPostProvider;
