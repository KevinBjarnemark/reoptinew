import { useContext } from 'react';
import style from './SubmitButton.module.css';
import GeneralLoadingContext from '@general-loading-context';

export const SubmitButton = (props) => {
    const { generalLoading } = useContext(GeneralLoadingContext);

    return (
        <button
            className={
                'flex-column-relative align-items-center mt-5 mb-3 ' +
                `${style.button}`
            }
            style={{
                backgroundColor: generalLoading ? '#f1be78' : '#ffffff',
                cursor: generalLoading ? 'not-allowed' : 'pointer',
            }}
            disabled={generalLoading}
            {...props}
        >
            {props.text}
        </button>
    );
};
