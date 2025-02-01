import PopUpContext from './PopUpContext';
import { useState, useRef } from 'react';

const PopUpProvider = ({ children }) => {
    // States
    const [show, setShow] = useState(false);
    const componentRef = useRef(null);
    const [title, setTitle] = useState('');

    const openPopUp = (title, component) => {
        componentRef.current = component;
        setTitle(title);
        setShow(true);
    };

    const closePopUp = () => {
        componentRef.current = null;
        setShow(false);
        setTitle('');
    };

    return (
        <PopUpContext.Provider
            value={{
                show,
                setShow,
                openPopUp,
                closePopUp,
                componentRef,
                title,
            }}
        >
            {children}
        </PopUpContext.Provider>
    );
};

export default PopUpProvider;
