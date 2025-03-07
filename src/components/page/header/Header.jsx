import { useContext } from 'react';
import GeneralLoadingContext from '@general-loading-context';
import Logo from '../../logo/Logo';
import NotificationContext from '@notification-context';
import style from './Header.module.css';
import PageDimContext from '@page-dim-context';
import AppLoadingContext from '@app-loading-context';

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
                style={{
                    // This fixes a small glitch where the transition
                    // overlaps the currentNotification state.
                    opacity: currentNotification ? 1 : 0,
                }}
            ></i>
            <p>{currentNotification?.message}</p>
        </div>
    );
};

const Header = () => {
    const { generalLoading } = useContext(GeneralLoadingContext);
    const { appLoading } = useContext(AppLoadingContext);
    const { currentNotification } = useContext(NotificationContext);
    const { dim } = useContext(PageDimContext);

    // Ensure notifications and loading indicators are visible in dimmed mode
    const dimmedStyle =
        (currentNotification && dim) || (dim && generalLoading)
            ? {
                  zIndex: 4,
                  background: 'transparent',
                  border: 'none',
              }
            : {};

    return (
        <header style={{ ...dimmedStyle, opacity: appLoading ? 0 : 1 }}>
            <section className="header-container">
                <Logo
                    loading={generalLoading}
                    hide={currentNotification}
                    link="/"
                />
                <Notification />
            </section>
        </header>
    );
};

export default Header;
