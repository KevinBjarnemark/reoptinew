import { useContext, useEffect } from 'react';
import PageSection from '../../components/page/page-section/PageSection';
import Account from './components/account/Account';
import Posts from '../../components/posts/main/Posts';
import style from './Profile.module.css';
import PostContext from '@post-context';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import UserContext from '../../context/UserContext';

/**
 * The profile page component.
 *
 * @returns {JSX.Element}
 */
const Profile = () => {
    const { singlePost, posts, renderPosts, renderPost, pageRouteRef } =
        useContext(PostContext);
    const { isAuthenticated } = useContext(UserContext);
    const { postId } = useParams();
    const { identifier } = useParams();
    const location = useLocation();

    // Ensure posts are displayed at the profile page
    useEffect(() => {
        if (location) {
            const relativePath = location.pathname.split('/')[1];
            pageRouteRef.current = `${relativePath}/${identifier}`;
        }

        // Cleanup function when <Profile /> unmounts
        return () => {
            pageRouteRef.current = 'posts';
        };

        // Ignoring pageRouteRef as a dependency because React doesn't
        // track changes to refs, and adding it here would have no effect.
        // This useEffect only needs to re-run when identifier changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [identifier]);

    // Since the context exist outside of the routes, handle
    // routing here.
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
        renderPosts({ user_id: identifier });

        // renderPosts is in itself not a dependency,
        // but since it's imported from a context, ES Lint is flagging
        // it as one unnecessarily.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, identifier]);

    return (
        <>
            <PageSection>
                <Account />
            </PageSection>
            <section
                className={`flex-column-relative ${style['page-container']}`}
            >
                <Posts postsArray={posts} singlePost={singlePost} />
            </section>
            <Outlet />
        </>
    );
};

export default Profile;
