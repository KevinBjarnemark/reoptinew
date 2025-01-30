import { useState, useEffect } from 'react';
import style from './Image.module.css';

const Image = (props) => {
    const {
        image,
        inputProps = {},
        previewImg = null,
        editMode,
        defaultImage,
        standalone,
    } = props;
    const [showCustomImageHint, setShowCustomImageHint] = useState(false);

    useEffect(() => {
        let timeId;
        let timeId2;

        if (editMode && standalone) {
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

        // Both editMode and standalone mode won't change unless the
        // component unmounts.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <button className={`flex-column-relative ${style['image-container']}`}>
            {editMode ? (
                <>
                    <input {...inputProps} id="image" type="file" hidden />
                    <label
                        htmlFor="image"
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

            {!previewImg ? (
                <img
                    className={`flex-column-relative ${style['image']}`}
                    src={image.src ? image.src : defaultImage}
                    alt="Preview image"
                />
            ) : (
                <img
                    className={`flex-column-relative ${style['image']}`}
                    src={previewImg}
                    alt="Preview image"
                />
            )}
        </button>
    );
};

export default Image;
