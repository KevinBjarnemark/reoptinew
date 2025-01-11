import { useContext } from 'react';
import GeneralLoadingContext from '@general-loading-context';
import Logo from '../../logo/Logo';
import NotificationContext from '@notification-context';
import style from './Header.module.css';

const Notification = () => {
    const { currentNotification } = useContext(NotificationContext);

    return (
        <div
            className={`flex-column-absolute ${style['notification-text']}`}
            style={{
                transform: `scale(${currentNotification ? 1 : 0})`,
                color: currentNotification?.successful ? '#8fed63' : '#ff5a5a',
            }}
        >
            <i
                className={
                    currentNotification?.successful
                        ? 'fa-solid fa-check'
                        : 'fa-solid fa-x'
                }
            ></i>
            <p>{currentNotification?.message}</p>
        </div>
    );
};

const Header = () => {
    const { generalLoading } = useContext(GeneralLoadingContext);
    const { currentNotification } = useContext(NotificationContext);

    return (
        <header>
            <section className="header-container">
                <Logo loading={generalLoading} hide={currentNotification} />
                <Notification />
            </section>
        </header>
    );
};

export default Header;
