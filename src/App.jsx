import './App.css'
import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import imgLogo from "./assets/images/brand/logo.webp";

// Load pages lazily
const SignUp = lazy(() => import('./pages/signup/SignUp'));

// Header
const Header = () => {
    return (
      <header>
          <img 
              style={{width: "80px", aspectRatio: "578 / 512"}}
              src={imgLogo}>
          </img>
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
        <>
            <Header />
            <main>
                <article>
                    <Router>
                        <Routes>
                            <Route path="/signup" element={<SignUp />}></Route>
                        </Routes>
                    </Router>
                </article>
            </main>
            <Navigation />
        </>
    )
}

export default App
