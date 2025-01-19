import style from './BasicForm.module.css';
import SubmitButton from '../../buttons/submit-button/SubmitButton';
import { Link } from 'react-router-dom';

const Input = (props) => {
    const { title = '', inputProps = {} } = props;

    return (
        <div className={`flex-row-relative ${style['input-container']}`}>
            <label className={style['label-input']}>{title}</label>
            <div className={style['artificial-border']}></div>
            <input className={`${style.input}`} {...inputProps}></input>
        </div>
    );
};

const Image = (props) => {
    const { inputProps = {}, labelText = '', previewImg = null } = props;

    return (
        <div
            className={
                'flex-column-relative pb-5 pt-3 ' +
                `${style['image-container']}`
            }
        >
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

/**
 * Creates a clickable link leading to another internal page.
 *
 * @param {object}  linkObj example --> {url: "/example", name: "Example"}
 * @returns {JSX.Element}
 *
 * Limitations:
 *
 * If the link is missing, it will appear as 'invisible'.
 *
 */
const TextLink = ({ linkObj, className }) => {
    if (linkObj?.url && linkObj?.name) {
        return (
            <Link
                to={linkObj.url}
                onClick={() => {
                    window.scrollTo(0, 0);
                }}
                className={className}
            >
                {linkObj.name}
            </Link>
        );
    }
};

const Checkbox = (props) => {
    const { id = '', label = {}, inputProps = {} } = props;

    return (
        <div
            className="flex-row-relative align-items-center 
            justify-content-center mt-4 pt-3 pb-2"
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
                <div
                    className={
                        'flex-row-relative ' +
                        `${style['checkbox-link-container']}`
                    }
                >
                    {label.text}
                    <TextLink
                        linkObj={label.link}
                        className={style['checkbox-link']}
                    />
                </div>
            </label>
        </div>
    );
};

const ErrorMessage = (props) => {
    const { text = '' } = props;

    return <p className={`${style['error-message']} mt-5`}>{text}</p>;
};

const BasicForm = (props) => {
    const { children, submitButtonProps = {} } = props;

    return (
        <form
            className="flex-column-relative align-items-center 
            mt-4 mb-5 w-100"
            role="form"
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

export default BasicForm;
