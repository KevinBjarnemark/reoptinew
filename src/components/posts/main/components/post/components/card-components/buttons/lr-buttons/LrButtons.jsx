import style from './LrButtons.module.css';

const LrButtons = (props) => {
    const { show, setCardIndex } = props;
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

export default LrButtons;
