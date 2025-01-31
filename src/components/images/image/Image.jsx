import { useState, useEffect } from 'react';
import style from './Image.module.css';

const Image = (props) => {
    const {
        image,
        inputProps = {},
        previewImg = null,
        editMode,
        defaultImage,
        customStyle = style, // Allow custom style import
    } = props;
    const [showCustomImageHint, setShowCustomImageHint] = useState(false);

    useEffect(() => {
        let timeId;
        let timeId2;

        if (editMode) {
            timeId = setTimeout(() => {
                setShowCustomImageHint(true);
            }, 3000);
            timeId2 = setTimeout(() => {
                setShowCustomImageHint(false);
            }, 8000);
        }

        return () => {
            clearTimeout(timeId);
            clearTimeout(timeId2);
        };

        // Both editMode mode won't change unless the
        // component unmounts.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <button
            className={
                'flex-column-relative ' + customStyle['image-container']
            }
        >
            {editMode ? (
                <>
                    <input {...inputProps} type="file" hidden />
                    <label
                        htmlFor={inputProps.id}
                        className={'flex-column-absolute'}
                        style={{
                            backgroundColor: showCustomImageHint
                                ? '#ffffff'
                                : 'transparent',
                        }}
                    >
                        {showCustomImageHint
                            ? 'Click here to upload a custom image'
                            : ''}
                    </label>
                </>
            ) : null}

            <img
                className={`flex-column-relative ${customStyle['image']}`}
                src={previewImg || image?.src || defaultImage}
                alt="Preview image"
            />
        </button>
    );
};

export default Image;
