import { useContext, useEffect } from 'react';
import style from './PopUp.module.css';
import BasicButton from '@basic-button';
import PopUpContext from '@pop-up-context';
import PageDimContext from '../../../context/page-dim/PageDimContext';

const YesOrNo = (props) => {
    const showDebugging = true;
    // Props
    const { title, yes, no } = props;

    return (
        <section
            className={
                'flex-column-relative ' + style['accept-or-cancel-container']
            }
        >
            <div
                className={'flex-column-relative ' + style['yes-or-no-title']}
            >
                <h6>{title}</h6>
            </div>

            <div
                className={
                    'flex-row-relative ' + style['yes-or-no-buttons-container']
                }
            >
                <button
                    onClick={no.onClick}
                    style={{
                        backgroundColor: no?.color || '#ef7070',
                    }}
                >
                    {no.name}
                </button>
                <button
                    onClick={yes.onClick}
                    style={{
                        backgroundColor: yes?.color || '#a2e78d',
                    }}
                >
                    {yes.name}
                </button>
            </div>
        </section>
    );
};

const PopUp = () => {
    const { show, closePopUp, componentRef, title } = useContext(PopUpContext);
    const { setDim } = useContext(PageDimContext);

    useEffect(() => {
        setDim(show);
    }, [show]);

    const handleClose = () => {
        closePopUp();
        setDim(false);
    };

    if (show) {
        return (
            <section className={'flex-column-fixed ' + `${style.container}`}>
                <div
                    className={
                        'flex-column-relative ' + `${style['inner-container']}`
                    }
                >
                    <h3 className={style.title}>{title}</h3>
                    <BasicButton
                        text={'X'}
                        buttonProps={{
                            onClick: handleClose,
                            className:
                                'flex-column-fixed ' +
                                `${style['close-button']}`,
                        }}
                    />

                    {componentRef?.current ? (
                        <div
                            className={
                                'flex-column-relative ' + style['component']
                            }
                        >
                            {componentRef?.current}
                        </div>
                    ) : null}
                </div>
            </section>
        );
    }
};

PopUp.YesOrNo = YesOrNo;

export default PopUp;
