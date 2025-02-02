import { useContext, useEffect } from 'react';
import style from './Home.module.css';
import Posts from '../../components/posts/main/Posts';
import PostContext from '@post-context';
import { useParams, Outlet } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import RatingWindow from '@c-c/rating-window/RatingWindow';

const Home = () => {
    const { singlePost, posts, renderPosts, renderPost } =
        useContext(PostContext);
    const { isAuthenticated } = useContext(UserContext);
    const { postId } = useParams();

    // Since the context exist outside of the routes, handle
    // routing here
    useEffect(() => {
        if (postId) {
            renderPost(Number(postId));
        }

        // renderPost is in itself not a dependency,
        // but since it's imported from a context, ES Lint is flagging
        // it as one unnecessarily.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId, isAuthenticated]);

    useEffect(() => {
        renderPosts();

        // renderPosts is in itself not a dependency,
        // but since it's imported from a context, ES Lint is flagging
        // it as one unnecessarily.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (
        <>
            <section
                className={`flex-column-relative ${style['page-container']}`}
            >
                <Posts postsArray={posts} singlePost={singlePost} />
                <RatingWindow {...{}} />
            </section>
            <Outlet />
        </>
    );
};

export default Home;
