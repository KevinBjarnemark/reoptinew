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
import PageDim from './components/backgrounds/page-dim/PageDim';
import AppCloseButton from './components/buttons/app-close-button/AppCloseButton';
import AppCloseButtonProvider from './context/app-close-button/AppCloseButtonProvider';

// Load pages lazily
const Home = lazy(() => import('./pages/home/Home'));
const Post = lazy(() => import('./components/posts/post/Post'));
const Signup = lazy(() => import('./pages/signup/Signup'));
const Login = lazy(() => import('./pages/login/Login'));
const Profile = lazy(() => import('./pages/profile/Profile'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                {/* Nested route for focused post */}
                <Route path="posts/post/:postId" element={<Post />} />
            </Route>
            <Route path="/profile" element={<Profile />}></Route>
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
            <AlertWindow />
            <PageDim />
            <AppCloseButton />
            {appLoading ? <AppLoading /> : null}
        </>
    );
};

export function AppContextWrap({ children }) {
    return (
        <Router>
            <GeneralLoadingProvider>
                <PageDimProvider>
                    <AppCloseButtonProvider>
                        <AlertProvider>
                            <NotificationProvider>
                                <UserProvider>
                                    <AppLoadingProvider>
                                        {children}
                                    </AppLoadingProvider>
                                </UserProvider>
                            </NotificationProvider>
                        </AlertProvider>
                    </AppCloseButtonProvider>
                </PageDimProvider>
            </GeneralLoadingProvider>
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
