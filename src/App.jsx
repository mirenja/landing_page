// import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Index from './pages/Index';
import ContactUs from './pages/ContactUs';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
    
  );
}
