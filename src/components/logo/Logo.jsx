import { useContext } from 'react';
import style from './Logo.module.css';
import { Link } from 'react-router-dom';
import NotificationContext from '@notification-context';
import PostContext from '../../context/posts/post/PostContext';

const Logo = ({ loading = false, hide = false, link = null }) => {
    const { addNotification } = useContext(NotificationContext);
    const { renderPosts } = useContext(PostContext);

    const animationCSS = {
        'outer-circle': loading ? style['outer-circle-animation'] : '',
        'loading-text-container-animation': loading
            ? style['loading-text-container-animation']
            : '',
        'tilted-bar-animation': loading ? style['tilted-bar-animation'] : '',
        'brand-name-animation': loading ? style['brand-name-animation'] : '',
    };

    const Wrapper = link ? Link : 'div';

    const handleClick = async () => {
        if (window.location.pathname === '/') {
            await addNotification(true, 'Reloading posts...');
            renderPosts();
        }
    };

    return (
        <Wrapper
            to={link || undefined}
            onClick={handleClick}
            className={'flex-column-relative ' + `${style['container']}`}
            style={{ transform: `scale(${hide ? 0 : 1})` }}
        >
            <div className="flex-column-relative">
                <div
                    className={
                        'flex-column-relative ' +
                        `${style['outer-circle']} ` +
                        `${animationCSS['outer-circle']}`
                    }
                >
                    <div
                        className={
                            'flex-column-absolute ' +
                            `${style['inner-circle']}`
                        }
                    ></div>
                </div>
            </div>
            <div
                className={`flex-column-absolute ${style['bottom-bar']}`}
            ></div>
            <div
                className={
                    `flex-column-absolute ${style['tilted-bar']} ` +
                    `${animationCSS['tilted-bar-animation']}`
                }
            ></div>

            <p
                className={
                    `${style['brand-name']} ` +
                    `${animationCSS['brand-name-animation']}`
                }
            >
                {loading ? 'Loading...' : 'eoptinew'}
            </p>
        </Wrapper>
    );
};

export default Logo;
