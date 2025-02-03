import { useState, useEffect, useContext } from 'react';
import PostSearchContext from './PostSearchContext';
import PostContext from '@post-context';
import UserContext from '../../UserContext';

const PostSearchProvider = ({ children }) => {
    const showDebugging = true;
    const [showSeachWindow, setShowSeachWindow] = useState(false);

    const [sortBy, setSortBy] = useState('date');
    const [view, setView] = useState('show_all_posts');
    const [alsoSearchIn, setAlsoSearchIn] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState(null);
    const { renderPosts } = useContext(PostContext);
    const { profile } = useContext(UserContext);

    const [body, setBody] = useState({
        action: 'filter',
    });

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
