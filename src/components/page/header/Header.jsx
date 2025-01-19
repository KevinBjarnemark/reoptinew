import { useContext } from 'react';
import GeneralLoadingContext from '@general-loading-context';
import Logo from '../../logo/Logo';
import NotificationContext from '@notification-context';
import style from './Header.module.css';
import PageDimContext from '../../../context/page-dim/PageDimContext';

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
    const { dim } = useContext(PageDimContext);

    // Ensure notifications and loading indicators are visible in dimmed mode
    const dimmedStyle =
        (currentNotification && dim) || (dim && generalLoading)
            ? { zIndex: 2, background: 'transparent', border: 'none' }
            : {};

    return (
        <header style={{ ...dimmedStyle }}>
            <section className="header-container">
                <Logo loading={generalLoading} hide={currentNotification} />
                <Notification />
            </section>
        </header>
    );
};

export default Header;
