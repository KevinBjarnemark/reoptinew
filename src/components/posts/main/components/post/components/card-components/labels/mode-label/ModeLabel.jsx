import style from './ModeLabel.module.css';

const ModeLabel = ({ labelText, color }) => {
    return (
        <div
            className={`flex-column-absolute ${style['label']}`}
            style={{
                boxShadow: `0 0 5px 2px ${color}`,
            }}
        >
            <h6 style={{ color: color }}>{labelText}</h6>
        </div>
    );
};

export default ModeLabel;
