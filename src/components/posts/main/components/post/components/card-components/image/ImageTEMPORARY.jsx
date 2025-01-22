import { useMemo } from 'react';
import style from './ImageTEMPORARY.module.css';
import defaultImage1 from '../../../../../../../../assets/images/post/default/1.webp';
import defaultImage2 from '../../../../../../../../assets/images/post/default/2.webp';
import defaultImage3 from '../../../../../../../../assets/images/post/default/3.webp';
import defaultImage4 from '../../../../../../../../assets/images/post/default/4.webp';
const defaultImages = [
    defaultImage1,
    defaultImage2,
    defaultImage3,
    defaultImage4,
];

const ImageTEMPORARY = ({ image }) => {
    const randomImageIndex = useMemo(
        () => Math.floor(Math.random() * defaultImages.length),
        [],
    );

    return (
        <img
            className={`flex-column-relative ${style.image}`}
            src={image.src ? image.src : defaultImages[randomImageIndex]}
        ></img>
    );
};

export default ImageTEMPORARY;
