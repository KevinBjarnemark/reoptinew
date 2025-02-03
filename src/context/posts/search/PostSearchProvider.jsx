import { useState, useEffect, useContext } from 'react';
import PostSearchContext from './PostSearchContext';
import PostContext from '@post-context';
import UserContext from '@user-context';
import AlertContext from '@alert-context';
import { isArray } from '@helpers';

const PostSearchProvider = ({ children }) => {
    const [showSeachWindow, setShowSeachWindow] = useState(false);
    const [sortBy, setSortBy] = useState('date');
    const [view, setView] = useState('show_all_posts');
    const [alsoSearchIn, setAlsoSearchIn] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState(null);
    const { renderPosts } = useContext(PostContext);
    const { profile, isAuthenticated } = useContext(UserContext);

    const [body, setBody] = useState({
        action: 'filter',
    });

    const { addAlert } = useContext(AlertContext);

    useEffect(() => {
        setBody((prev) => ({
            ...prev,
            filters: {
                userId: userId,
                sort_by: sortBy,
                view: view,
                also_search_in: alsoSearchIn,
                search_query: searchQuery.split(' '), // API expects an array
                followers: profile?.following,
            },
        }));
    }, [sortBy, view, searchQuery, alsoSearchIn, userId]);

    const applyFilter = async () => {
        if (
            !isArray(profile?.following, true) &&
            view === 'only_users_you_follow'
        ) {
            if (!isAuthenticated) {
                addAlert(
                    'You must log in to be able to filter by followers.',
                    'Info',
                );
            } else {
                addAlert(
                    "Showing you all posts because you don't follow anyone.",
                    'Info',
                );
            }
        }

        renderPosts(body.filters);
        setShowSeachWindow(false);
    };

    return (
        <PostSearchContext.Provider
            value={{
                sortBy,
                setSortBy,
                view,
                setView,
                alsoSearchIn,
                setAlsoSearchIn,
                searchQuery,
                setSearchQuery,
                applyFilter,
                showSeachWindow,
                setShowSeachWindow,
            }}
        >
            {children}
        </PostSearchContext.Provider>
    );
};

export default PostSearchProvider;
