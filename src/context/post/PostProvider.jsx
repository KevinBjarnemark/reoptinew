import { useState, useContext, useEffect } from 'react';
import PostContext from './PostContext';
import { useNavigate } from 'react-router-dom';
import PageDimContext from '../page-dim/PageDimContext';
import AppCloseButtonContext from '../app-close-button/AppCloseButtonContext';
import useAPI from '../../hooks/forms/useAPI';

const PostProvider = ({ children }) => {
    // The current post focused, targeted by URL (parameter)
    const [currentPostId, setCurrentPostId] = useState(null);
    // The currently targeted post data
    const [singlePost, setSinglePost] = useState(null);
    // Loaded posts data
    const [posts, setPosts] = useState([]);

    // Hooks
    const navigate = useNavigate();

    // Custom hooks
    const { apiRequest } = useAPI(true);
    const { setDim } = useContext(PageDimContext);

    // Contexts
    const { setShowAppCloseButton, appCloseButtonOnClickRef } = useContext(
        AppCloseButtonContext,
    );

    const getSinglePost = async (id) => {
        const init = async () => {
            const response = await apiRequest({
                relativeURL: `/posts/post/${id}`,
                debugMessages: {
                    backendError: "Couldn't fetch post (backend)",
                    frontendError: "Couldn't fetch post (frontend)",
                    successfulBackEndResponse: 'Fetched post successfully',
                },
                method: 'GET',
            });

            if (response) {
                console.log('Fetched post successfully', response);
                setSinglePost(response);
            } else {
                console.log("Couldn't fetch post", response);
            }
        };
        await init();
    };

    const getAllPosts = async () => {
        const init = async () => {
            const response = await apiRequest({
                relativeURL: '/posts/posts/',
                debugMessages: {
                    backendError: "Couldn't fetch posts (backend)",
                    frontendError: "Couldn't fetch posts (frontend)",
                    successfulBackEndResponse: 'Fetched posts successfully',
                },
                method: 'GET',
            });

            if (response) {
                console.log('Fetched posts successfully', response);
                setPosts(response);
            } else {
                console.log("Couldn't fetch posts", response);
            }
        };
        await init();
    };

    const handleClose = () => {
        navigate('/');
        setCurrentPostId(null);
        // Dim the app background and hide the close button
        setDim(false);
        setShowAppCloseButton(false);
        appCloseButtonOnClickRef.current = () => {};
    };

    const handleFocus = (postId) => {
        // Navigate to post URL
        navigate(`/posts/post/${postId}`);
        setCurrentPostId(postId);
        // Dim the app background and show the close button
        setDim(true);
        setShowAppCloseButton(true);
        // Insert close function
        appCloseButtonOnClickRef.current = handleClose;
    };

    // Single posts
    useEffect(() => {
        if (currentPostId) {
            getSinglePost(Number(currentPostId));
            handleFocus(Number(currentPostId));
        } else {
            handleClose();
            setSinglePost(null);
        }
    }, [currentPostId]);

    // All posts
    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <PostContext.Provider
            value={{
                handleFocus,
                handleClose,
                singlePost,
                setSinglePost,
                posts,
                setCurrentPostId,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export default PostProvider;
