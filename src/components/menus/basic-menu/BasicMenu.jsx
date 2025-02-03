import { useRef, useEffect } from 'react';
import style from './BasicMenu.module.css';
import { Link } from 'react-router-dom';
import FadedBackgroundShadow from '@faded-background-shadow';
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
        left,
        hideTitle = false,
        hideShadow = false,
    } = props;

    const show = toggled === name;

    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target)
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

        // handleToggle is in itself not a dependency,
        // but since it's imported from props, ES Lint is flagging
        // it as one unnecessarily.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (show) {
        return (
            <section ref={containerRef}>
                {!hideShadow ? <FadedBackgroundShadow show={show} /> : null}
                <div
                    className={'flex-column-absolute ' + `${style.container}`}
                    style={{ top, left }}
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
