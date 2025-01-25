import { useState } from 'react';
import style from './Posts.module.css';
import Post from './components/post/Post';

const RenderPosts = ({ posts }) => {
    const postsExist = posts && Array.isArray(posts) && posts?.length > 0;
    const [toggled, setToggled] = useState('');

    const handleToggleSettings = (id) => {
        setToggled((prev) => (prev.endsWith(id) ? '' : `Settings ${id}`));
    };

    if (postsExist) {
        return (
            <>
                {posts.map((post) => {
                    return (
                        <Post
                            // Use a key that includes all values that might change during
                            // interactions to help JavaScript and React efficiently identify
                            // and re-render the component.
                            key={`${post.id}-${post.likes.count}`}
                            standalone={false}
                            post={{ ...post }}
                            settings={{
                                handleToggle: handleToggleSettings,
                                toggled,
                            }}
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
                />
            ) : null}
        </div>
    );
};

export default Posts;
