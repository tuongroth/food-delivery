import React, { useState } from 'react'; 
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar'; 
import Home from './pages/Home/Home'; 
import Cart from './pages/Cart/Cart';  
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';  
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';  // Thêm import cho LoginPopup

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app">
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}  {/* Fix lỗi hiển thị popup */}
      <Navbar setShowLogin={setShowLogin} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />  
        <Route path="/order" element={<PlaceOrder />} />  
      </Routes>
      
      <Footer />
    </div>
  );
};

export default App;
