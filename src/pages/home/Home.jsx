import style from './Home.module.css';
import Posts from '../../components/posts/main/Posts';

const Home = () => {
    return (
        <section className={`flex-column-relative ${style['page-container']}`}>
            <Posts />
        </section>
    );
};

export default Home;
