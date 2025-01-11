import style from './BasicForm.module.css';
import { SubmitButton } from '../../buttons/SubmitButton';

const Input = (props) => {
    const { title = '', inputProps = {} } = props;

    return (
        <div className="flex-row-relative">
            <label className={style['label-input']}>{title}</label>
            <div className={style['artificial-border']}></div>
            <input className={`${style.input}`} {...inputProps}></input>
        </div>
    );
};

const Image = (props) => {
    const { inputProps = {}, labelText = '', previewImg = null } = props;

    return (
        <div className="flex-column-relative">
            <input {...inputProps} type="file" hidden />
            <label
                htmlFor={inputProps.id}
                className={`flex-column-relative ${style['image-label']}`}
                style={{
                    backgroundColor: previewImg
                        ? 'var(--color-image-background)'
                        : '#ffffff',
                    padding: !previewImg ? '20px 20px' : '0',
                }}
            >
                {previewImg ? (
                    <img
                        className={`flex-column-relative ${style['image']}`}
                        src={previewImg}
                        alt="Preview image"
                    />
                ) : (
                    labelText
                )}
            </label>
        </div>
    );
};

const Border = ({ children }) => {
    return (
        <div
            style={{
                border: '3px solid var(--color-dark-border)',
                borderRadius: '3px',
            }}
        >
            {children}
        </div>
    );
};

const Checkbox = (props) => {
    const { id = '', labelHtml = '', inputProps = {} } = props;

    return (
        <div
            className="flex-row-relative align-items-center 
            justify-content-center mt-4"
            style={{ padding: '10px' }}
        >
            {/* Chekbox */}
            <div
                className={`flex-row-relative align-items-center 
                    justify-content-center ${style['checkbox-container']}`}
            >
                <input
                    className={`flex-row-relative ${style.checkbox}`}
                    type="checkbox"
                    id={id}
                    {...inputProps}
                />
            </div>

            {/* Label */}
            <label style={{ height: '100%' }} htmlFor={id}>
                {labelHtml}
            </label>
        </div>
    );
};

const ErrorMessage = (props) => {
    const { text = '' } = props;

    return <p className={`${style['error-message']} mt-5`}>{text}</p>;
};

const Birthdate = (props) => {
    const { title = 'Birth date', inputProps = {} } = props;

    return (
        <div className="flex-row-relative">
            <label className={style['label-input']}>{title}</label>
            <div className={style['artificial-border']}></div>
            <input
                className={`${style.input}`}
                type="date"
                {...inputProps}
            ></input>
        </div>
    );
};

export const BasicForm = (props) => {
    const { children, submitButtonProps = {} } = props;

    return (
        <form
            className="flex-column-relative align-items-center 
            mt-4 mb-4 w-100"
        >
            {children}
            <SubmitButton {...submitButtonProps} />
        </form>
    );
};

// Attach subcomponents
BasicForm.Input = Input;
BasicForm.Image = Image;
BasicForm.Border = Border;
BasicForm.Checkbox = Checkbox;
BasicForm.ErrorMessage = ErrorMessage;
BasicForm.Birthdate = Birthdate;
