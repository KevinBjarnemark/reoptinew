import { useRef, useEffect } from 'react';
import style from './BasicMenu.module.css';
import { Link } from 'react-router-dom';
import FadedBackgroundShadow from '../../backgrounds/faded-background-shadow/FadedBackgroundShadow';
import BorderSeparator from '@border-separator';

const ButtonItem = ({ props, name, icon }) => {
    return (
        <button
            className={
                `flex-row-relative ${style['section-item']} ` + 'no-decoration'
            }
            {...props}
        >
            <i className={`flex-column-absolute ${icon}`}></i>
            <h5>{name}</h5>
        </button>
    );
};

const LinkItem = ({ name, icon, link, handleClose }) => {
    return (
        <Link
            to={link}
            onClick={() => {
                handleClose();
                window.scrollTo(0, 0);
            }}
            className={
                `flex-row-relative ${style['section-item']} ` + 'no-decoration'
            }
        >
            <i className={`flex-column-absolute ${icon}`}></i>
            <h5>{name}</h5>
        </Link>
    );
};

const SectionTitle = ({ name }) => {
    return (
        <div className={`flex-row-relative ${style['section-title']}`}>
            <h5>{name}</h5>
        </div>
    );
};

const Wrapper = ({ children, props }) => {
    const {
        toggled,
        handleToggle,
        name,
        top,
        hideTitle = false,
        hideShadow = false,
    } = props;

    const show = toggled === name;

    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                handleToggle(); // Trigger the toggle function
            }
        };

        // Add event listeners
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    if (show) {
        return (
            <section ref={containerRef}>
                {!hideShadow ? <FadedBackgroundShadow show={show} /> : null}
                <div
                    className={'flex-column-absolute ' + `${style.container}`}
                    style={{ top }}
                >
                    {!hideTitle ? (
                        <>
                            <SectionTitle name={name} />
                            <BorderSeparator />
                        </>
                    ) : null}
                    {children}
                </div>
            </section>
        );
    }
};

const BasicMenu = () => {
    return <></>;
};

BasicMenu.ButtonItem = ButtonItem;
BasicMenu.LinkItem = LinkItem;
BasicMenu.Wrapper = Wrapper;

export default BasicMenu;
