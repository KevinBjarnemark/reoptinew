import style from './SubmitButton.module.css';

export const SubmitButton = (props) => {
    return (
        <button
            className={
                'flex-column-relative align-items-center mt-5 mb-3 ' +
                `${style.button}`
            }
            {...props}
        >
            {props.text}
        </button>
    );
};
