import { useContext, useEffect } from 'react';
import style from './Home.module.css';
import Posts from '../../components/posts/main/Posts';
import PostContext from '../../context/post/PostContext';
import { useParams, Outlet } from 'react-router-dom';

const Home = () => {
    const { singlePost, posts, renderPosts, renderPost } =
        useContext(PostContext);
    const { postId } = useParams();

    // Since the context exist outside of the routes, handle
    // routing here
    useEffect(() => {
        if (postId) {
            renderPost(Number(postId));
        }
    }, [postId]);

    useEffect(() => {
        renderPosts();
    }, []);

    return (
        <>
            <section
                className={`flex-column-relative ${style['page-container']}`}
            >
                <Posts postsArray={posts} singlePost={singlePost} />
            </section>
            <Outlet />
        </>
    );
};

export default Home;
