import style from './LeftAndRightButtons.module.css';

const LeftAndRightButtons = ({ show, setCardIndex }) => {
    const cardsAmount = 5;

    if (show) {
        return (
            <>
                <button
                    className={`flex-column-fixed ${style['next-button']}`}
                    onClick={() => {
                        setCardIndex((prev) =>
                            Math.min(prev + 1, cardsAmount - 1),
                        );
                    }}
                ></button>
                <button
                    className={`flex-column-fixed ${style['previous-button']}`}
                    onClick={() => {
                        setCardIndex((prev) => Math.max(prev - 1, 0));
                    }}
                ></button>
            </>
        );
    }
};

export default LeftAndRightButtons;
