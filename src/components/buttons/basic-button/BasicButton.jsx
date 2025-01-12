import style from './BasicButton.module.css';

const BasicButton = (props) => {
    const { buttonProps, buttonStyle, text } = props;

    return (
        <button
            className={
                'flex-column-relative align-items-center mt-5 mb-3 ' +
                `${style.button}`
            }
            style={{ ...buttonStyle }}
            {...buttonProps}
        >
            {text}
        </button>
    );
};

export default BasicButton;
