import style from './NavButton.module.css';

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

export default NavButton;
