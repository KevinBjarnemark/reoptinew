import style from './Home.module.css';
import Post from '../../components/posts/post/Post';

const mockedData = [
    {
        id: 0,
        title: 'Post 0',
        image: null,
        engagementPanel: {
            savesMoney: 0,
            savesTime: 50,
            isUseful: 100,
        },
        comments: [
            { createdAt: '2025-01-16 08:00', username: 'Joe', text: 'Hello' },
            { createdAt: '2025-01-16 08:00', username: 'Joe', text: 'Hello' },
        ],
        likes: 0,
    },
    {
        id: 1,
        title: 'Post 1',
        image: null,
        engagementPanel: {
            savesMoney: 100,
            savesTime: 50,
            isUseful: 0,
        },
        comments: [
            { createdAt: '2025-01-16 08:00', username: 'Joe', text: 'Hello' },
        ],
        likes: 1,
    },
    {
        id: 2,
        title: 'Post 2',
        image: null,
        engagementPanel: {
            savesMoney: 21,
            savesTime: 66,
            isUseful: 100,
        },
        comments: [],
        likes: 3,
    },
    {
        id: 3,
        title: 'Post 3',
        image: null,
        engagementPanel: {
            savesMoney: 1,
            savesTime: 50,
            isUseful: 99,
        },
        comments: [
            { createdAt: '2025-01-16 08:00', username: 'Joe', text: 'Hello' },
            { createdAt: '2025-01-16 08:00', username: 'Joe', text: 'Hello' },
            { createdAt: '2025-01-16 08:00', username: 'Joe', text: 'Hello' },
            { createdAt: '2025-01-16 08:00', username: 'Joe', text: 'Hello' },
        ],
        likes: 5,
    },
];

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
    return (
        <section className={`flex-column-relative ${style['page-container']}`}>
            <MappedPosts posts={[...mockedData]} />
        </section>
    );
};

export default Home;
