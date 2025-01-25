import { useState, useContext, useRef } from 'react';
import PostContext from './PostContext';
import { useNavigate } from 'react-router-dom';
import PageDimContext from '../page-dim/PageDimContext';
import AppCloseButtonContext from '@app-close-button-context';
import useAPI from '@use-api';
import useNeutralizeApp from '@use-neutralize-app';
import NotificationContext from '@notification-context';

const PostProvider = ({ children }) => {
    const { addNotification } = useContext(NotificationContext);

    /**
     * This is a custom configuration for loading single posts at a
     * specific route. By default, all posts are viewed at the home
     * page (/posts).
     */
    const pageRouteRef = useRef('posts');

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
        const response = await apiRequest({
            method: 'GET',
            relativeURL: `/posts/posts/${id}`,
            authorizationHeader: true,
            debugMessages: {
                error: "Couldn't load single post.",
                successfulBackEndResponse: 'Fetched single post successfully',
            },
            uxMessages: {
                error: "Couldn't load post, try refreshing your browser.",
            },
        });

        if (response) {
            setSinglePost(response);
            await addNotification(true, 'Post loaded!');
        } else {
            await addNotification(false, "Couldn't load post :(");
        }
    };

    const updateLikes = (id, increment) => {
        setPosts((prev) =>
            prev.map((post) =>
                post.id === id
                    ? {
                          ...post,
                          likes: {
                              count: post.likes.count + increment,
                              user_has_liked: increment < 0 ? false : true,
                          },
                      }
                    : post,
            ),
        );
    };

    const getPosts = async (filterObj) => {
        const init = async () => {
            const body = {
                action: 'filter',
                filters: { ...filterObj },
            };

            const response = await apiRequest({
                relativeURL: '/posts/posts/',
                authorizationHeader: true,
                debugMessages: {
                    error: 'Error when fetching posts',
                    successfulBackEndResponse: 'Fetched posts successfully',
                },
                uxMessages: {
                    error: "Couldn't load posts. Try refreshing your browser.",
                },
                method: filterObj ? 'POST' : 'GET',
                ...(filterObj ? { body } : {}),
            });

            if (response) {
                setPosts(response);
                await addNotification(true, 'Posts loaded!');
            } else {
                await addNotification(false, "Couldn't load posts :(");
            }
        };

        await init();
    };

    const renderPosts = (filterObj = null) => {
        if (filterObj) {
            getPosts({ ...filterObj });
        } else {
            getPosts();
        }
    };

    const renderPost = (postId) => {
        // Navigate to post URL
        navigate(`/${pageRouteRef.current}/post/${postId}`);
        // Dim the app background and show the close button
        setDim(true);
        renderAppCloseButton(handleClosePost);
        getSinglePost(postId);
    };

    const handleClosePost = () => {
        if (pageRouteRef.current === 'posts') {
            navigate('/');
        } else {
            navigate(`/${pageRouteRef.current}`);
        }
        setSinglePost(null);
        neutralizeApp(false);
    };

    return (
        <PostContext.Provider
            value={{
                singlePost,
                setSinglePost,
                posts,
                renderPosts,
                renderPost,
                handleClosePost,
                pageRouteRef,
                updateLikes,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export default PostProvider;
