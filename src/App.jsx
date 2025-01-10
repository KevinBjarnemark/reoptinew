import './App.css';
import { lazy, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import imgLogo from './assets/images/brand/logo.webp';
import UserContext from './context/UserContext';
import UserProvider from './context/UserProvider';
import LoadingContext from './context/LoadingContext';
import LoadingProvider from './context/LoadingProvider';
import AlertProvider from './context/alert-context/AlertProvider';
import AlertWindow from './components/alerts/alert-window/AlertWindow';
import { UserCard } from './components/user/user-card/UserCard';
import AppLoading from './components/loading/AppLoading';

// Load pages lazily
const Signup = lazy(() => import('./pages/signup/Signup'));
const Login = lazy(() => import('./pages/login/Login'));

// Header
const Header = () => {
    return (
        <header>
            <img className="logo" src={imgLogo} alt="Logo" />
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
    const { appLoading } = useContext(LoadingContext);

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
            <AlertProvider>
                <UserProvider>
                    <LoadingProvider>
                        <AppBody />
                    </LoadingProvider>
                </UserProvider>
            </AlertProvider>
        </Router>
    );
}

export default App;
