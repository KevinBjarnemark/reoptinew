import style from './Subtitle.module.css';

const Subtitle = ({ subtitle }) => {
    return <h6 className={style['sub-title']}>{subtitle}</h6>;
};

export default Subtitle;
