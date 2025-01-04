import './App.css'
import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import imgLogo from "./assets/images/brand/logo.webp";
import { UserProvider } from './context/UserContext'; 

// Load pages lazily
const SignUp = lazy(() => import('./pages/signup/SignUp'));

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
    return (
      <nav></nav>
    );
}

function App() {
    return (
        <Router>
            <UserProvider>
                <Header />
                <main>
                    <article>
                        <Routes>
                            <Route path="/signup" element={<SignUp />}></Route>
                        </Routes>
                    </article>
                </main>
                <Navigation />
            </UserProvider>
        </Router>
    )
}

export default App
