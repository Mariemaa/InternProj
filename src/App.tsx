import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Ensure this path is correct
import Home from './components/Home'; // Ensure this path is correct


function App() {
    return (
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            
          </Routes>
        </Router>
      );
}

export default App;
