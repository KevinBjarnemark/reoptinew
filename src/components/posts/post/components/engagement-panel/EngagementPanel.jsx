import style from './EngagementPanel.module.css';

const RatingProgressBar = ({ icon, value }) => {
    return (
        <div className={`flex-row-relative ${style['ratings-container']}`}>
            <div
                className={
                    'flex-column-relative ' +
                    `${style['rating-icon-container']}`
                }
            >
                <div className={`flex-column ${style['rating-icon']}`}>
                    <i className={icon}></i>
                </div>
            </div>

            <div
                className={
                    'flex-column-relative ' +
                    `${style['rating-bar-container']}`
                }
            >
                <div className={`flex-column-relative ${style['rating-bar']}`}>
                    <div
                        className={
                            'flex-column-relative ' +
                            `${style['rating-bar-filled']}`
                        }
                        style={{ width: `${value}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

const EngageButton = ({ value, icon }) => {
    return (
        <div
            className={
                'flex-column-relative ' + `${style['engage-button-container']}`
            }
        >
            <i className={icon}></i>
            <p className="flex-column-absolute">{value}</p>
        </div>
    );
};

const EngageButtons = ({ likes, comments }) => {
    return (
        <div
            className={
                'flex-row-relative ' + `${style['engage-buttons-container']}`
            }
        >
            <EngageButton value={likes} icon="fa-solid fa-heart" />

            <div className={style['vertical-separator']}></div>
            <EngageButton value={comments} icon="fa-solid fa-comment" />
        </div>
    );
};

const EngagementPanel = ({
    savesMoney = 0,
    savesTime = 0,
    isUseful = 0,
    likes,
    comments,
}) => {
    return (
        <section className={`flex-column-relative ${style.container}`}>
            <div className={style['horizontal-separator']}></div>
            <RatingProgressBar
                icon="fa-solid fa-dollar-sign"
                value={savesMoney}
            />
            <RatingProgressBar icon="fa-regular fa-clock" value={savesTime} />
            <RatingProgressBar icon="fa-solid fa-hand-fist" value={isUseful} />
            <div className={style['horizontal-separator']}></div>
            <EngageButtons {...{ likes, comments }} />
            <div className={style['horizontal-separator']}></div>
        </section>
    );
};

export default EngagementPanel;
