import { useState, useContext, useRef } from 'react';
import PostContext from './PostContext';
import { useNavigate } from 'react-router-dom';
import PageDimContext from '../../page-dim/PageDimContext';
import AppCloseButtonContext from '@app-close-button-context';
import useAPI from '@use-api';
import useNeutralizeApp from '@use-neutralize-app';
import NotificationContext from '@notification-context';
import { debug } from '@debug';

const PostProvider = ({ children }) => {
    const showDebugging = true;
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

    // The post that is currently being edited (post id)
    const [editingPost, setEditingPost] = useState('');
    const [creatingPost, setCreatingPost] = useState(false);

    // Hooks
    const navigate = useNavigate();
    // Custom hooks
    const { apiRequest } = useAPI(true);
    const { neutralizeApp } = useNeutralizeApp();

    // Contexts
    const { setShowAppCloseButton } = useContext(AppCloseButtonContext);
    const { setDim } = useContext(PageDimContext);

    const fetchSinglePost = async (id) => {
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
            return response;
        } else {
            return null;
        }
    };

    const loadSinglePost = async (id) => {
        const fetchedPost = await fetchSinglePost(id);
        if (fetchedPost) {
            setSinglePost(fetchedPost);
            await addNotification(true, 'Post loaded!');
            return;
        }
        await addNotification(false, "Couldn't load post :(");
    };

    const updateSinglePost = async (id) => {
        const fetchedPost = await fetchSinglePost(id);

        setPosts((prev) =>
            prev.map((post) => (post.id === id ? fetchedPost : post)),
        );
    };

    const addSinglePost = async (post) => {
        setPosts((prev) => [...prev, post]);
    };

    const removeSinglePost = async (id) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
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
                authorizationHeader: true,
                relativeURL: '/posts/posts/',
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
        // Navigate to post route
        const postRoute = `/${pageRouteRef.current}/post/${postId}`;
        navigate(postRoute);
        debug('d', showDebugging, 'Navigated to post route:', postRoute);
        // Dim the app background and show the close button
        setDim(true);
        // Fetch the targeted post
        debug('d', showDebugging, 'Fetching a single post.', '');
        loadSinglePost(postId);
        // Show the app close button
        setShowAppCloseButton(true);
    };

    const openEditor = (postId) => {
        setEditingPost(postId);
        debug('d', showDebugging, `Opened editor for post ${postId}.`, '');
        renderPost(postId);
    };

    const handleClosePost = () => {
        debug('d', showDebugging, 'Closing a post...', '');
        setSinglePost(null);
        setEditingPost('');
        neutralizeApp(false);
        // Handle both profile and home route navigation
        const userIsAtHomeRoute = pageRouteRef.current === 'posts';
        if (userIsAtHomeRoute) {
            navigate('/');
            debug(
                'd',
                showDebugging,
                'Navigated back to the home route because the user ' +
                    ' was there initially.',
                '',
            );
        } else {
            navigate(`/${pageRouteRef.current}`);
            debug(
                'd',
                showDebugging,
                `Navigated back to ${pageRouteRef.current} because ` +
                    ' the user was there initially.',
                '',
            );
        }
    };

    return (
        <PostContext.Provider
            value={{
                singlePost,
                setSinglePost,
                posts,
                setPosts,
                renderPosts,
                renderPost,
                handleClosePost,
                pageRouteRef,
                updateLikes,
                editingPost,
                setEditingPost,
                openEditor,
                updateSinglePost,
                addSinglePost,
                creatingPost,
                setCreatingPost,
                removeSinglePost,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export default PostProvider;
