import { useState, useEffect } from 'react';
import style from './Home.module.css';
import Post from '../../components/posts/post/Post';
import useAPI from '../../hooks/forms/useAPI';

const MappedPosts = ({ posts }) => {
    if (posts && Array.isArray(posts) && posts?.length > 0) {
        return (
            <div className={`flex-row-relative ${style['posts-container']}`}>
                {posts.map((post) => {
                    return <Post key={post.id} post={{ ...post }} />;
                })}
            </div>
        );
    }
};

const Home = () => {
    const { apiRequest } = useAPI(true);
    const [posts, setPosts] = useState(false);

    const getAllPosts = async () => {
        const init = async () => {
            const response = await apiRequest({
                relativeURL: '/posts/posts/',
                debugMessages: {
                    backendError: 'Post creation failed (backend)',
                    frontendError: 'Post creation failed (frontend)',
                    successfulBackEndResponse: 'Post creation successful',
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

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <section className={`flex-column-relative ${style['page-container']}`}>
            {posts?.length > 0 ? <MappedPosts posts={[...posts]} /> : null}
        </section>
    );
};

export default Home;
