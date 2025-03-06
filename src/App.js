import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import YouthAcademy from './pages/YouthAcademy';
import AdultLeague from './pages/AdultLeague';
import PrivateTraining from './pages/PrivateTraining';
import SummerCamp from './pages/SummerCamp';
import FreeTrialRegistration from './pages/FreeTrialRegistration';
import Store from './pages/Store';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import NewsAdminPage from './pages/NewsAdminPage';
import CheckoutSuccess from './pages/CheckoutSuccess';
import { CartProvider } from './context/CartContext';
import ProgramCarousel from './components/ProgramCarousel'
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/youth-academy" element={<YouthAcademy />} />
              <Route path="/adult-league" element={<AdultLeague />} />
              <Route path="/private-training" element={<PrivateTraining />} />
              <Route path="/summer-camp" element={<SummerCamp />} />
              <Route path="/free-trial" element={<FreeTrialRegistration />} />
              <Route path="/store" element={<Store />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/admin/news" element={<NewsAdminPage />} />
              <Route path="/checkout-success" element={<CheckoutSuccess />} />
              <Route path="/programs" element={<ProgramCarousel />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
