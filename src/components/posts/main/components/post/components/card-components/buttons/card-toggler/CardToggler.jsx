import { useContext } from 'react';
import style from './CardToggler.module.css';
import { TriangleButton } from '@triangle-button';
import ScreenContext from '@screen-context';

const CardToggler = (props) => {
    const { show, setCardIndex } = props;
    const cardsAmount = 5;
    const { screenWidth } = useContext(ScreenContext);

    const leftToggle = () => {
        setCardIndex((prev) => Math.max(prev - 1, 0));
    };
    const rightToggle = () => {
        setCardIndex((prev) => Math.min(prev + 1, cardsAmount - 1));
    };

    const colors = {
        backgroundColor: '#ffffff',
        backgroundColorHovered: 'rgb(195, 210, 214)',
    };

    if (show && screenWidth <= 650) {
        return (
            <div className={`flex-column-absolute ${style['container']}`}>
                <div
                    className={`flex-column-absolute ${style['triangle']}`}
                    style={{
                        left: '9%',
                        transform: 'rotate(180deg)',
                    }}
                >
                    <TriangleButton // Left button
                        {...{
                            buttonProps: {
                                onClick: leftToggle,
                            },
                            canvasProps: {
                                style: {
                                    width: '35px',
                                },
                            },
                            colors,
                        }}
                    />
                </div>

                <p>Toggle cards</p>

                <div
                    className={`flex-column-absolute ${style['triangle']}`}
                    style={{
                        right: '9%',
                    }}
                >
                    <TriangleButton // Right button
                        {...{
                            buttonProps: {
                                onClick: rightToggle,
                            },
                            canvasProps: {
                                style: {
                                    width: '35px',
                                },
                            },
                            colors,
                        }}
                    />
                </div>
            </div>
        );
    } else if (show) {
        return (
            <>
                <div
                    className={`flex-column-absolute ${style['triangle-big']}`}
                    style={{
                        left: screenWidth < 1024 ? '-35%' : '-23%',
                        top: '38%',
                        transform: 'rotate(180deg)',
                    }}
                >
                    <TriangleButton // Left button
                        {...{
                            buttonProps: {
                                onClick: leftToggle,
                            },
                            canvasProps: {
                                style: {
                                    width: '60px',
                                },
                            },
                            colors,
                        }}
                    />
                </div>

                <div
                    className={`flex-column-absolute ${style['triangle-big']}`}
                    style={{
                        right: screenWidth < 1024 ? '-35%' : '-23%',
                        top: '38%',
                    }}
                >
                    <TriangleButton // Right button
                        {...{
                            buttonProps: {
                                onClick: rightToggle,
                            },
                            canvasProps: {
                                style: {
                                    width: '60px',
                                    right: 0,
                                },
                            },
                            colors,
                        }}
                    />
                </div>
            </>
        );
    }
    return null;
};

export default CardToggler;
