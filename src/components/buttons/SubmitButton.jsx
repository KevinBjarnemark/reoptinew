
import style from './SubmitButton.module.css';

export const SubmitButton = (props) => {
    return (
        <button 
            className={`flex-column-relative ${style.button} align-items-center mt-5 mb-3`}
            {...props}
        >
            {props.text}
        </button>
  );
}
