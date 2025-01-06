import './App.css'
import { lazy, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import imgLogo from "./assets/images/brand/logo.webp";
import UserContext from './context/UserContext'; 
import UserProvider from './context/UserProvider'; 
import { UserCard } from './components/user/user-card/UserCard'; 

// Load pages lazily
const Signup = lazy(() => import('./pages/signup/Signup'));
const Login = lazy(() => import('./pages/login/Login'));

// Header
const Header = () => {
    return (
      <header>
          <img className='logo' src={imgLogo} alt="Logo" />
      </header>
    );
}

// Navigation
const Navigation = () => {
    return (<nav></nav>);
}

const AppRoutes = () => {
    const {isAuthenticated} = useContext(UserContext);

    // User routes
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/*" element={<></>}></Route>
            </Routes>
        );
    }else {
        // Guest routes
        return (
            <Routes>
                <Route path="/*" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        );
    }
}

const AppBody = () => {
    const {isAuthenticated} = useContext(UserContext);

    if (isAuthenticated !== null) {
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
            </>
        );
    }else {
        return (
            <div>LOADING....</div>
        )
    }
}

function App() {
    return (
        <Router>
            <UserProvider>
                <AppBody />
            </UserProvider>
        </Router>
    );
}

export default App
