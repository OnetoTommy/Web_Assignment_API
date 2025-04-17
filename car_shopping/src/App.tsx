import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CarDetail from './components/CarDetail';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* <Navbar /> */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/car/:id" 
              element={<CarDetail car={{
                id: 0,
                make: '',
                model: '',
                year: 0,
                price: 0,
                image: '',
                description: '',
                features: []
              }} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 