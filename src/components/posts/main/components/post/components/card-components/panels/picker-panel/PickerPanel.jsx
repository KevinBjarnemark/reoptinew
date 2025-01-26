import style from './PickerPanel.module.css';

/**
 * Toggle buttons for toggling between indexes.
 *
 * @param {object}  props
 * @param {number} props.index The current index state value.
 * @param {function} props.setIndex The state updater function for `index`.
 * @param {number} props.maxLength The total number of indexes
 * (maximum length).
 * @returns {JSX.Element}
 */
const ToggleButtons = (props) => {
    const { index, setIndex, maxLength } = props;
    return (
        <div
            className={
                'flex-row-relative ' + style['toggle-buttons-container']
            }
        >
            <button
                className={'flex-column-absolute'}
                style={{ left: '10%' }}
                onClick={() => {
                    setIndex((prev) => Math.max(prev - 1, 0));
                }}
            >
                ◄
            </button>

            <p>{`${index + 1}/${maxLength}`}</p>
            <button
                className={'flex-column-absolute'}
                style={{ right: '10%' }}
                onClick={() => {
                    setIndex((prev) => Math.min(prev + 1, maxLength - 1));
                }}
            >
                ►
            </button>
        </div>
    );
};

/**
 * Picks and toggles between indexes with an optional label.
 *
 * @param {object} props The component props.
 * @param {boolean} props.show Controls whether the panel is visible.
 * @param {number} props.index The current index state value.
 * @param {function} props.setIndex The state updater function for `index`.
 * @param {number} props.maxLength The total number of indexes
 * (maximum length).
 * @param {string} props.label A label displayed within the panel.
 * @returns {JSX.Element|null}
 */
const PickerPanel = (props) => {
    const { show, index, setIndex, maxLength, label } = props;

    if (show) {
        return (
            <div
                className={
                    'flex-column-fixed ' + style['picker-panel-container']
                }
            >
                <ToggleButtons
                    {...{
                        index,
                        setIndex,
                        maxLength,
                    }}
                />

                <div className={`flex-column-relative ${style['label']}`}>
                    <p>{label}</p>
                </div>
            </div>
        );
    }

    return null;
};

export default PickerPanel;
