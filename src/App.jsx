import './App.css';
import { lazy, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import AppLoadingContext from '@app-loading-context';
import AppLoadingProvider from '@app-loading-provider';
import GeneralLoadingProvider from '@general-loading-provider';
import PageDimProvider from './context/page-dim/PageDimProvider';
import AlertProvider from './context/alert-context/AlertProvider';
import AlertWindow from './components/alerts/alert-window/AlertWindow';
import { UserCard } from './components/user/user-card/UserCard';
import AppLoading from './components/loading/AppLoading';
import Header from './components/page/header/Header';
import Navigation from './components/page/navigation/Navigation';
import NotificationProvider from '@notification-provider';
import RatePostProvider from '@rate-post-provider';
import CommentPostProvider from '@comment-post-provider';
import PageDim from './components/backgrounds/page-dim/PageDim';
import AppCloseButton from '@app-close-button';
import AppCloseButtonProvider from '@app-close-button-provider';
import PostProvider from '@post-provider';
import EditedPostProvider from '@edited-post-provider';
import ScreenProvider from '@screen-provider';
import PopUpProvider from '@pop-up-provider';
import PopUp from './components/pop-ups/pop-up/PopUp';

// Load pages lazily
const Home = lazy(() => import('./pages/home/Home'));
const Signup = lazy(() => import('./pages/signup/Signup'));
const Login = lazy(() => import('./pages/login/Login'));
const Profile = lazy(() => import('./pages/profile/Profile'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                {/* Nested route for single posts */}
                <Route path="posts/post/:postId" element={<></>} />
            </Route>
            {/* Profiles targeted by user id or username */}
            <Route path="/profile/:identifier" element={<Profile />}>
                {/* Nested route for single post */}
                <Route path="post/:postId" element={<></>} />
            </Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
    );
};

const AppBody = ({ children }) => {
    const { appLoading } = useContext(AppLoadingContext);
    return (
        <>
            <Header />
            <main>
                <article>{children}</article>
                <UserCard />
            </main>
            <Navigation />

            <PageDim />
            <PopUp />
            <AlertWindow />
            <AppCloseButton />
            {appLoading ? <AppLoading /> : null}
        </>
    );
};

export function AppContextWrap({ children }) {
    return (
        <Router>
            <PopUpProvider>
                <RatePostProvider>
                    <CommentPostProvider>
                        <ScreenProvider>
                            <GeneralLoadingProvider>
                                <PageDimProvider>
                                    <AppCloseButtonProvider>
                                        <AlertProvider>
                                            <NotificationProvider>
                                                <UserProvider>
                                                    <AppLoadingProvider>
                                                        <PostProvider>
                                                            <EditedPostProvider>
                                                                {children}
                                                            </EditedPostProvider>
                                                        </PostProvider>
                                                    </AppLoadingProvider>
                                                </UserProvider>
                                            </NotificationProvider>
                                        </AlertProvider>
                                    </AppCloseButtonProvider>
                                </PageDimProvider>
                            </GeneralLoadingProvider>
                        </ScreenProvider>
                    </CommentPostProvider>
                </RatePostProvider>
            </PopUpProvider>
        </Router>
    );
}

export const App = () => {
    return (
        <AppContextWrap>
            <AppBody>
                <AppRoutes />
            </AppBody>
        </AppContextWrap>
    );
};

export const TestApp = ({ children }) => {
    return (
        <AppContextWrap>
            <AppBody>{children}</AppBody>
        </AppContextWrap>
    );
};
