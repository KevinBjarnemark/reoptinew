import './App.css';
import { lazy, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContext from './context/UserContext';
import UserProvider from './context/UserProvider';
import AppLoadingContext from '@app-loading-context';
import AppLoadingProvider from '@app-loading-provider';
import GeneralLoadingContext from '@general-loading-context';
import GeneralLoadingProvider from '@general-loading-provider';
import AlertProvider from './context/alert-context/AlertProvider';
import AlertWindow from './components/alerts/alert-window/AlertWindow';
import { UserCard } from './components/user/user-card/UserCard';
import AppLoading from './components/loading/AppLoading';
import Logo from './components/logo/Logo';

// Load pages lazily
const Signup = lazy(() => import('./pages/signup/Signup'));
const Login = lazy(() => import('./pages/login/Login'));

// Header
const Header = () => {
    const { generalLoading } = useContext(GeneralLoadingContext);

    return (
        <header>
            <section className="header-container">
                <Logo loading={generalLoading} />
            </section>
        </header>
    );
};

// Navigation
const Navigation = () => {
    return <nav></nav>;
};

const AppRoutes = () => {
    const { isAuthenticated } = useContext(UserContext);

    // User routes
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/*" element={<></>}></Route>
            </Routes>
        );
    } else {
        // Guest routes
        return (
            <Routes>
                <Route path="/*" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        );
    }
};

const AppBody = () => {
    const { appLoading } = useContext(AppLoadingContext);

    return (
        <>
            <Header />
            <main>
                <article>
                    <AppRoutes />
                </article>
                <UserCard />
            </main>
            <Navigation />
            <AlertWindow />
            {appLoading ? <AppLoading /> : null}
        </>
    );
};

function App() {
    return (
        <Router>
            <GeneralLoadingProvider>
                <AlertProvider>
                    <UserProvider>
                        <AppLoadingProvider>
                            <AppBody />
                        </AppLoadingProvider>
                    </UserProvider>
                </AlertProvider>
            </GeneralLoadingProvider>
        </Router>
    );
}

export default App;
