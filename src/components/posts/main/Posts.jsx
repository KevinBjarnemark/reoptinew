import style from './Posts.module.css';
import Post from './components/post/Post';

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

const Posts = ({ postsArray, singlePost }) => {
    return (
        <div className={`flex-row-relative ${style['posts-container']}`}>
            <RenderPosts posts={[...postsArray]} />

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
