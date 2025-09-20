// App.jsx

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Footer from './pages/Footer';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AdminLogin from './pages/AdminLogin';
import AdminRegistration from './pages/AdminRegistration';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import OurTeam from './pages/OurTeam';
import Recipes from './pages/Recipes';
import SavedRecipes from './pages/SavedRecipes';
import React from 'react'
import RecipeDetails from './pages/RecipeDetails';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';


function App() {
  return (
    <Router>
      <ToastContainer />
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();

  // Define the routes where you want the footer (e.g., only on the Home page)
  const footerPages = ['/home'];

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />  
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminregister" element={<AdminRegistration />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<OurTeam />} />

        <Route path="/recipes" element={<Recipes />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
        <Route path="/recipe/:rid" element={<RecipeDetails />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsAndConditions />} />

      </Routes>
      
      {/* Conditionally render the Footer only on the /home route */}
      {footerPages.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;