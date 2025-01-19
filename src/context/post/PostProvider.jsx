import { useState, useContext, useEffect } from 'react';
import PostContext from './PostContext';
import { useNavigate } from 'react-router-dom';
import PageDimContext from '../page-dim/PageDimContext';
import AppCloseButtonContext from '@app-close-button-context';
import useAPI from '@use-api';
import useNeutralizeApp from '@use-neutralize-app';

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
    const { neutralizeApp } = useNeutralizeApp();

    // Contexts
    const { renderAppCloseButton } = useContext(AppCloseButtonContext);
    const { setDim } = useContext(PageDimContext);

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
        neutralizeApp();
    };

    const handleFocus = (postId) => {
        // Navigate to post URL
        navigate(`/posts/post/${postId}`);
        setCurrentPostId(postId);
        // Dim the app background and show the close button
        setDim(true);
        renderAppCloseButton(handleClose);
    };

    // Single posts
    useEffect(() => {
        if (currentPostId) {
            getSinglePost(Number(currentPostId));
            handleFocus(Number(currentPostId));
        } else {
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
