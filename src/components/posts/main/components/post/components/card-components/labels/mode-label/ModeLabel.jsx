import style from './ModeLabel.module.css';

const ModeLabel = ({ labelText }) => {
    return (
        <div className={`flex-column-absolute ${style['label']}`}>
            <h6>{labelText}</h6>
        </div>
    );
};

export default ModeLabel;
