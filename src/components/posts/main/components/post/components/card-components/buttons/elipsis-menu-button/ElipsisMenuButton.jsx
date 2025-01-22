import style from './EllipsisMenuButton.module.css';

const EllipsisMenuButton = ({ show }) => {
    if (show) {
        return (
            <>
                <div className={`flex-column-absolute ${style['dot']}`}></div>
                <div
                    className={`flex-column-absolute ${style['dot']}`}
                    style={{ right: '13px' }}
                ></div>
                <div
                    className={`flex-column-absolute ${style['dot']}`}
                    style={{ right: '26px' }}
                ></div>
            </>
        );
    }
};

export default EllipsisMenuButton;
