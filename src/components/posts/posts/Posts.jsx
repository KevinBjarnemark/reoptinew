import { useEffect, useContext } from 'react';
import style from './Posts.module.css';
import Post from '../post/Post';
import PostContext from '../../../context/post/PostContext';
import { useParams } from 'react-router-dom';

const RenderPosts = ({ posts }) => {
    const postsExist = posts && Array.isArray(posts) && posts?.length > 0;

    if (postsExist) {
        return (
            <>
                {posts.map((post) => {
                    return (
                        <Post
                            key={post.id}
                            standalone={false}
                            post={{ ...post }}
                            postsLength={posts.length}
                        />
                    );
                })}
            </>
        );
    }

    return null;
};

const Posts = () => {
    const { singlePost, posts, setCurrentPostId } = useContext(PostContext);
    const { postId } = useParams();

    // Since the context exist outside of the routes, set currentPostId here.
    useEffect(() => {
        if (postId) {
            setCurrentPostId(Number(postId));
        } else {
            setCurrentPostId(null);
        }
    }, [postId]);

    return (
        <div className={`flex-row-relative ${style['posts-container']}`}>
            <RenderPosts posts={[...posts]} />

            {singlePost ? (
                <Post
                    key={`focused-${singlePost.id}`}
                    standalone={true}
                    post={{ ...singlePost }}
                    postsLength={1}
                />
            ) : null}
        </div>
    );
};

export default Posts;
