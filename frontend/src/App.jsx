
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import AdminMessages from './AdminMessages';
import AdminLogin from './AdminLogin';

function Portfolio() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Contact />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-messages" element={<AdminMessages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



