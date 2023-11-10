import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome.tsx';
import Dashboard from './Pages/Dashboard.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
