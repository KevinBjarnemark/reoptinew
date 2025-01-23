import { useContext, useEffect } from 'react';
import PageSection from '../../components/page/page-section/PageSection';
import Account from './components/account/Account';
import Posts from '../../components/posts/main/Posts';
import style from './Profile.module.css';
import PostContext from '../../context/post/PostContext';
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
            pageRouteRef.current = `${location.pathname.split('/')[1]}/${identifier}`;
        }

        // Cleanup function when <Profile /> unmounts
        return () => {
            pageRouteRef.current = 'posts';
        };
    }, [identifier]);

    // Since the context exist outside of the routes, handle
    // routing here
    useEffect(() => {
        if (postId) {
            renderPost(Number(postId));
        }
    }, [postId]);

    useEffect(() => {
        renderPosts({ user_id: identifier });
    }, [isAuthenticated]);

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
