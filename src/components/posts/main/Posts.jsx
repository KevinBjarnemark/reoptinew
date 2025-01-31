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
                    // This key includes all values that might need a
                    // re-render. Entries such as description, and tags
                    // are not visible in the feed, so only the visible
                    // entries that may change are necessary. This helps
                    // JavaScript and React to efficiently identify and
                    // re-render the component.
                    const dynamicKey =
                        `${post.id}-` +
                        `${post.likes.count}` +
                        `-${post.title}`;
                    return (
                        <Post
                            key={dynamicKey}
                            standalone={false}
                            post={{ ...post }}
                            settings={{
                                handleToggle: handleToggleSettings,
                                toggled,
                            }}
                            postsMaxLength={posts.length}
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
                    key={`standalone-${singlePost.id}`}
                    standalone={true}
                    post={{ ...singlePost }}
                />
            ) : null}
        </div>
    );
};

export default Posts;
