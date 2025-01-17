import style from './NavMenu.module.css';
import { Link } from 'react-router-dom';
import BackgroundShadow from '../background-shadow/BackgroundShadow';
import BorderSeparator from '@border-separator';

/**
 * The icon button in sidebar (always visible).
 */
const NavButton = (props) => {
    const { buttonProps = {}, icon } = props;

    return (
        <button
            className={`${style['icon-button']} pt-4 pb-4 w-100`}
            {...buttonProps}
        >
            <i className={icon}></i>
        </button>
    );
};

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

const SectionTitle = ({ name }) => {
    return (
        <div className={`flex-row-relative ${style['section-title']}`}>
            <h5>{name}</h5>
        </div>
    );
};

const Wrapper = ({ children, props }) => {
    const { toggled, handleToggle, name, top } = props;

    const show = toggled === name;

    if (show) {
        return (
            <section>
                <BackgroundShadow show={show} />
                <div
                    className={'flex-column-absolute ' + `${style.container}`}
                    style={{ top }}
                >
                    <SectionTitle name={name} />
                    <BorderSeparator />
                    {children}
                    <SectionClose handleClose={handleToggle} />
                </div>
            </section>
        );
    }
};

const NavMenu = () => {
    return <></>;
};

NavMenu.NavButton = NavButton;
NavMenu.ButtonItem = ButtonItem;
NavMenu.LinkItem = LinkItem;
NavMenu.Wrapper = Wrapper;

export default NavMenu;
