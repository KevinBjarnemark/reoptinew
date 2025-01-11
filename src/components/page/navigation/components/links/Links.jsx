import { useState } from 'react';
import style from './Links.module.css';
import { Link } from 'react-router-dom';
import BackgroundShadow from '../background-shadow/BackgroundShadow';
import BorderSeparator from '@border-separator';

const Icon = (props) => {
    const { buttonProps = {} } = props;

    return (
        <button
            className={`${style['icon-button']} mt-4 mb-4 w-100`}
            {...buttonProps}
        >
            <i className="fa-solid fa-bars"></i>
        </button>
    );
};

const SectionTitle = ({ name }) => {
    return (
        <div className={`flex-row-relative ${style['section-title']}`}>
            <h5>{name}</h5>
        </div>
    );
};

const SectionClose = ({ handleClose }) => {
    return (
        <button
            className={`flex-row-relative ${style['section-close']}`}
            onClick={handleClose}
        >
            <h5>Close</h5>
        </button>
    );
};

const SectionItem = ({ name, icon, link, handleClose }) => {
    return (
        <Link
            to={link}
            onClick={handleClose}
            className={
                `flex-row-relative ${style['section-item']} ` + 'no-decoration'
            }
        >
            <i className={`flex-column-absolute ${icon}`}></i>
            <h5>{name}</h5>
        </Link>
    );
};

const Links = () => {
    const [showLinks, setShowLinks] = useState(false);

    const handleToggle = () => {
        setShowLinks((prev) => !prev);
    };

    return (
        <>
            <section>
                <BackgroundShadow show={showLinks} />
                <div className="flex-column-absolute mt-5">
                    {showLinks ? (
                        <div
                            className={
                                'flex-column-absolute ' + `${style.container}`
                            }
                        >
                            <SectionTitle name="Navigation" />
                            <BorderSeparator />
                            <SectionItem
                                name="Home"
                                icon="fa-solid fa-house"
                                link="/home"
                                handleClose={handleToggle}
                            />
                            <BorderSeparator />
                            <SectionItem
                                name="About"
                                icon="fa-solid fa-circle-info"
                                link="/about"
                                handleClose={handleToggle}
                            />
                            <BorderSeparator />
                            <SectionItem
                                name="Profile"
                                icon="fa-solid fa-user"
                                link="/profile"
                                handleClose={handleToggle}
                            />

                            <SectionClose handleClose={handleToggle} />
                        </div>
                    ) : null}
                </div>
            </section>

            <Icon buttonProps={{ onClick: handleToggle }} />
        </>
    );
};

export default Links;
