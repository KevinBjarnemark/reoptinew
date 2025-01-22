import { useState, useEffect } from 'react';
import style from './HarmfulContentBanner.module.css';
import sharedStyles from '../../../../SharedStyles.module.css';

const HarmfulContentBanner = ({ title, data }) => {
    const [contentString, setContentString] = useState('');

    useEffect(() => {
        const result = data
            .reduce(
                (accumulator, material) => accumulator + material.name + ', ',
                '',
            )
            .slice(0, -2);
        setContentString(result + '.');
    }, []);

    if (Array.isArray(data) && data.length > 0) {
        return (
            <>
                <div
                    className={`flex-column-relative pb-4 pt-2 ${style['title-container']}`}
                >
                    <div
                        className={`flex-column-relative ${style['title-inner-container']}`}
                    >
                        <div className={`flex-row-relative`}>
                            <h6>Warning!</h6>
                            <i className="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <p>{`This post may include ${title.toLowerCase()} that are not safe for children. Materials such as ${contentString}`}</p>
                    </div>
                </div>
            </>
        );
    }
};

export default HarmfulContentBanner;
